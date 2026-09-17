import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { db } from '@/db';
import { users } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { verifyPhoneOtp, OTP_COOKIE } from '@/lib/otp';
import {
  createSession,
  SESSION_COOKIE,
  sessionCookieOptions,
  hashPassword,
  validEmail,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error:
            'Database is not connected (DATABASE_URL missing on Vercel). OTP verify needs the database to create your account.',
        },
        { status: 503 }
      );
    }

    await ensureDbInitialized();
    const body = await req.json();
    const { phone, code, name, city, email } = body as {
      phone?: string;
      code?: string;
      name?: string;
      city?: string;
      email?: string;
    };

    const jar = await cookies();
    const otpCookie = jar.get(OTP_COOKIE)?.value;
    const verified = await verifyPhoneOtp(phone || '', code || '', otpCookie);
    if (!verified.ok) {
      return NextResponse.json({ error: verified.error }, { status: 400 });
    }

    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.phone, verified.phone))
      .limit(1);

    let user = existing
      ? { id: existing.id, name: existing.name, email: existing.email, role: existing.role }
      : null;

    if (!user) {
      const displayName = (name || '').trim();
      if (displayName.length < 2) {
        return NextResponse.json(
          { error: 'Enter your full name to finish creating the account.', needsProfile: true },
          { status: 400 }
        );
      }
      const userCity = (city || 'Lahore').trim() || 'Lahore';
      const digits = verified.phone.replace(/\D/g, '');
      let userEmail =
        email && validEmail(email) ? email.trim().toLowerCase() : `u${digits.slice(-10)}@users.motor.pk`;

      const [emailTaken] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);
      if (emailTaken) {
        userEmail = `u${digits}${randomBytes(2).toString('hex')}@users.motor.pk`;
      }

      const [created] = await db
        .insert(users)
        .values({
          name: displayName,
          email: userEmail,
          phone: verified.phone,
          city: userCity,
          passwordHash: hashPassword(randomBytes(16).toString('hex')),
          role: 'user',
        })
        .returning({ id: users.id, name: users.name, email: users.email, role: users.role });
      user = created;
    } else if (existing.status !== 'active') {
      return NextResponse.json({ error: 'This account is not active.' }, { status: 403 });
    }

    const token = await createSession(user.id);
    const res = NextResponse.json({ success: true, user, isNew: !existing });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    res.cookies.set(OTP_COOKIE, '', { ...sessionCookieOptions(0), httpOnly: true, maxAge: 0 });
    return res;
  } catch (e) {
    console.error('otp verify error', e);
    const msg = e instanceof Error ? e.message : '';
    if (/connect|ECONNREFUSED|timeout|DATABASE/i.test(msg)) {
      return NextResponse.json(
        {
          error:
            'Database connection failed. Fix DATABASE_URL on Vercel, then retry OTP.',
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 });
  }
}
