import { randomInt, createHash } from 'crypto';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/db';
import { phoneOtps } from '@/db/schema';
import { normalisePhone } from '@/lib/auth';

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/** E.164 for SMS gateways: +923XXXXXXXXX */
export function phoneE164(displayOrRaw: string): string | null {
  const n = normalisePhone(displayOrRaw);
  if (!n) return null;
  const digits = n.replace(/\D/g, ''); // 923XXXXXXXXX
  return `+${digits}`;
}

function hashOtp(code: string, phone: string): string {
  return createHash('sha256').update(`${phone}:${code}`).digest('hex');
}

function generateCode(): string {
  return String(randomInt(100000, 999999));
}

async function sendViaTwilioSms(toE164: string, message: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!sid || !token || !from) return false;

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: toE164, From: from, Body: message }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('Twilio SMS failed', res.status, text);
  }
  return res.ok;
}

async function sendViaTwilioVerify(toE164: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const service = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!sid || !token || !service) return false;

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const res = await fetch(`https://verify.twilio.com/v2/Services/${service}/Verifications`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: toE164, Channel: 'sms' }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('Twilio Verify failed', res.status, text);
  }
  return res.ok;
}

async function checkTwilioVerify(toE164: string, code: string): Promise<boolean | null> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const service = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!sid || !token || !service) return null;

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const res = await fetch(`https://verify.twilio.com/v2/Services/${service}/VerificationCheck`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ To: toE164, Code: code }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { status?: string };
  return data.status === 'approved';
}

export type SendOtpResult = {
  ok: boolean;
  phone: string;
  e164: string;
  channel: 'twilio_verify' | 'twilio_sms' | 'demo';
  /** Only returned when SMS gateway is not configured — UI can show it. */
  demoCode?: string;
  error?: string;
};

export async function sendPhoneOtp(rawPhone: string): Promise<SendOtpResult> {
  const phone = normalisePhone(rawPhone);
  const e164 = phoneE164(rawPhone);
  if (!phone || !e164) {
    return { ok: false, phone: '', e164: '', channel: 'demo', error: 'Enter a valid Pakistani mobile (e.g. 0301 2345678).' };
  }

  // Prefer Twilio Verify (managed codes)
  if (process.env.TWILIO_VERIFY_SERVICE_SID && process.env.TWILIO_ACCOUNT_SID) {
    const sent = await sendViaTwilioVerify(e164);
    if (sent) {
      // Placeholder row so verify can fall through to Twilio check
      await db.delete(phoneOtps).where(eq(phoneOtps.phone, phone));
      await db.insert(phoneOtps).values({
        phone,
        codeHash: 'twilio_verify',
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        attempts: 0,
      });
      return { ok: true, phone, e164, channel: 'twilio_verify' };
    }
  }

  const code = generateCode();
  await db.delete(phoneOtps).where(eq(phoneOtps.phone, phone));
  await db.insert(phoneOtps).values({
    phone,
    codeHash: hashOtp(code, phone),
    expiresAt: new Date(Date.now() + OTP_TTL_MS),
    attempts: 0,
  });

  const message = `MOTOR | Pak code: ${code}. Valid 10 minutes. WordbitX group of companies.`;
  const smsOk = await sendViaTwilioSms(e164, message);
  if (smsOk) {
    return { ok: true, phone, e164, channel: 'twilio_sms' };
  }

  // No SMS provider configured — still allow signup with on-screen code
  console.info(`[MOTOR OTP] ${e164} → ${code}`);
  return {
    ok: true,
    phone,
    e164,
    channel: 'demo',
    demoCode: code,
  };
}

export type VerifyOtpResult = { ok: true; phone: string } | { ok: false; error: string };

export async function verifyPhoneOtp(rawPhone: string, code: string): Promise<VerifyOtpResult> {
  const phone = normalisePhone(rawPhone);
  const e164 = phoneE164(rawPhone);
  if (!phone || !e164) return { ok: false, error: 'Invalid phone number.' };
  const trimmed = String(code || '').trim();
  if (!/^\d{4,8}$/.test(trimmed)) return { ok: false, error: 'Enter the 6-digit code from SMS.' };

  const [row] = await db
    .select()
    .from(phoneOtps)
    .where(and(eq(phoneOtps.phone, phone), gt(phoneOtps.expiresAt, new Date())))
    .limit(1);

  if (!row) return { ok: false, error: 'Code expired. Please request a new OTP.' };

  if (row.codeHash === 'twilio_verify') {
    const approved = await checkTwilioVerify(e164, trimmed);
    if (approved) {
      await db.delete(phoneOtps).where(eq(phoneOtps.phone, phone));
      return { ok: true, phone };
    }
    await db.update(phoneOtps).set({ attempts: row.attempts + 1 }).where(eq(phoneOtps.id, row.id));
    return { ok: false, error: 'Incorrect code. Try again.' };
  }

  if (row.attempts >= MAX_ATTEMPTS) {
    await db.delete(phoneOtps).where(eq(phoneOtps.phone, phone));
    return { ok: false, error: 'Too many attempts. Request a new OTP.' };
  }

  if (row.codeHash !== hashOtp(trimmed, phone)) {
    await db.update(phoneOtps).set({ attempts: row.attempts + 1 }).where(eq(phoneOtps.id, row.id));
    return { ok: false, error: 'Incorrect code. Try again.' };
  }

  await db.delete(phoneOtps).where(eq(phoneOtps.phone, phone));
  return { ok: true, phone };
}
