import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { verifyPassword, createSession, SESSION_COOKIE, validEmail } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const { email, password } = await req.json();
    if (!validEmail(email || '') || !password) {
      return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase())).limit(1);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
    }
    if (user.status !== 'active') {
      return NextResponse.json({ error: 'This account is not active. Please contact support.' }, { status: 403 });
    }

    const token = await createSession(user.id);
    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true, sameSite: 'lax', path: '/', secure: true, maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e) {
    console.error('login error', e);
    return NextResponse.json({ error: 'Sign in failed. Please try again.' }, { status: 500 });
  }
}
