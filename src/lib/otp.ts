import { randomInt, createHash, createHmac, timingSafeEqual } from 'crypto';
import { normalisePhone, phoneE164 } from '@/lib/phone';

const OTP_TTL_MS = 10 * 60 * 1000;

export const OTP_COOKIE = 'motor_otp';
export { phoneE164 };

function otpSecret(): string {
  return (
    process.env.OTP_SECRET ||
    process.env.TWILIO_AUTH_TOKEN ||
    process.env.DATABASE_URL ||
    'motor-otp-dev-secret'
  );
}

function hashOtp(code: string, phone: string): string {
  return createHash('sha256').update(`${phone}:${code}`).digest('hex');
}

function generateCode(): string {
  return String(randomInt(100000, 999999));
}

function signPayload(payload: string): string {
  return createHmac('sha256', otpSecret()).update(payload).digest('hex');
}

/** Compact signed token stored in httpOnly cookie — no DB table required for OTP. */
export function buildOtpCookie(phone: string, code: string): string {
  const exp = Date.now() + OTP_TTL_MS;
  const hash = hashOtp(code, phone);
  const payload = `${phone}|${hash}|${exp}`;
  return `${Buffer.from(payload).toString('base64url')}.${signPayload(payload)}`;
}

export function readOtpCookie(
  token: string | undefined,
  code: string
): { ok: true; phone: string } | { ok: false; error: string } {
  if (!token) return { ok: false, error: 'OTP session expired. Request a new code.' };
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return { ok: false, error: 'Invalid OTP session. Request a new code.' };
  let payload = '';
  try {
    payload = Buffer.from(b64, 'base64url').toString('utf8');
  } catch {
    return { ok: false, error: 'Invalid OTP session. Request a new code.' };
  }
  const expected = signPayload(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, error: 'Invalid OTP session. Request a new code.' };
    }
  } catch {
    return { ok: false, error: 'Invalid OTP session. Request a new code.' };
  }

  const [phone, hash, expStr] = payload.split('|');
  const exp = Number(expStr);
  if (!phone || !hash || !exp) return { ok: false, error: 'Invalid OTP session. Request a new code.' };
  if (Date.now() > exp) return { ok: false, error: 'Code expired. Please request a new OTP.' };

  const trimmed = String(code || '').trim();
  if (!/^\d{4,8}$/.test(trimmed)) return { ok: false, error: 'Enter the 6-digit code from SMS.' };
  if (hashOtp(trimmed, phone) !== hash) return { ok: false, error: 'Incorrect code. Try again.' };
  return { ok: true, phone };
}

async function sendViaTwilioSms(toE164: string, message: string): Promise<{ ok: boolean; detail?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const from = process.env.TWILIO_PHONE_NUMBER?.trim();
  if (!sid || !token || !from) return { ok: false, detail: 'missing_sms_env' };

  try {
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
      return { ok: false, detail: text.slice(0, 200) };
    }
    return { ok: true };
  } catch (e) {
    console.error('Twilio SMS threw', e);
    return { ok: false, detail: 'twilio_sms_network' };
  }
}

async function sendViaTwilioVerify(toE164: string): Promise<{ ok: boolean; detail?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const service = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();
  if (!sid || !token || !service) return { ok: false, detail: 'missing_verify_env' };

  try {
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
      return { ok: false, detail: text.slice(0, 200) };
    }
    return { ok: true };
  } catch (e) {
    console.error('Twilio Verify threw', e);
    return { ok: false, detail: 'twilio_verify_network' };
  }
}

export async function checkTwilioVerify(
  toE164: string,
  code: string
): Promise<boolean | null> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const token = process.env.TWILIO_AUTH_TOKEN?.trim();
  const service = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();
  if (!sid || !token || !service) return null;

  try {
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
  } catch (e) {
    console.error('Twilio Verify check threw', e);
    return false;
  }
}

export type SendOtpResult = {
  ok: boolean;
  phone: string;
  e164: string;
  channel: 'twilio_verify' | 'twilio_sms' | 'demo';
  /** Cookie value to set (except pure Twilio Verify, which uses Twilio as source of truth). */
  cookie?: string;
  demoCode?: string;
  error?: string;
  twilioHint?: string;
};

export async function sendPhoneOtp(rawPhone: string): Promise<SendOtpResult> {
  const phone = normalisePhone(rawPhone);
  const e164 = phoneE164(rawPhone);
  if (!phone || !e164) {
    return {
      ok: false,
      phone: '',
      e164: '',
      channel: 'demo',
      error: 'Enter a valid Pakistani mobile (e.g. 0301 2345678 or 301 2345678).',
    };
  }

  // Prefer Twilio Verify when configured
  if (process.env.TWILIO_VERIFY_SERVICE_SID?.trim() && process.env.TWILIO_ACCOUNT_SID?.trim()) {
    const sent = await sendViaTwilioVerify(e164);
    if (sent.ok) {
      // Marker cookie so verify route knows to check Twilio
      const cookie = buildOtpCookie(phone, 'VERIFY');
      return { ok: true, phone, e164, channel: 'twilio_verify', cookie };
    }
    // Fall through to SMS / demo — don't hard-fail
  }

  const code = generateCode();
  const cookie = buildOtpCookie(phone, code);
  const message = `MOTOR | Pak code: ${code}. Valid 10 minutes. WordbitX group of companies.`;
  const sms = await sendViaTwilioSms(e164, message);
  if (sms.ok) {
    return { ok: true, phone, e164, channel: 'twilio_sms', cookie };
  }

  console.info(`[MOTOR OTP demo] ${e164} → ${code}`);
  return {
    ok: true,
    phone,
    e164,
    channel: 'demo',
    cookie,
    demoCode: code,
    twilioHint: sms.detail,
  };
}

export type VerifyOtpResult = { ok: true; phone: string } | { ok: false; error: string };

export async function verifyPhoneOtp(
  rawPhone: string,
  code: string,
  cookieToken?: string
): Promise<VerifyOtpResult> {
  const phone = normalisePhone(rawPhone);
  const e164 = phoneE164(rawPhone);
  if (!phone || !e164) return { ok: false, error: 'Invalid phone number.' };
  const trimmed = String(code || '').trim();
  if (!/^\d{4,8}$/.test(trimmed)) return { ok: false, error: 'Enter the 6-digit code from SMS.' };

  // Twilio Verify path: cookie was built with placeholder "VERIFY"
  if (cookieToken) {
    try {
      const [b64] = cookieToken.split('.');
      if (b64) {
        const payload = Buffer.from(b64, 'base64url').toString('utf8');
        if (payload.includes('|') && payload.split('|')[1] === hashOtp('VERIFY', phone)) {
          const approved = await checkTwilioVerify(e164, trimmed);
          if (approved) return { ok: true, phone };
          // Also allow matching local cookie if we fell back mid-flow
        }
      }
    } catch {
      /* continue to cookie check */
    }
  }

  return readOtpCookie(cookieToken, trimmed);
}
