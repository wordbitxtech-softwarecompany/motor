import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import {
  verifyPassword,
  createSession,
  SESSION_COOKIE,
  sessionCookieOptions,
  validEmail,
} from '@/lib/auth';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database is not configured. Set DATABASE_URL on the server.' },
        { status: 503 }
      );
    }
    await ensureDbInitialized();
    try {
      const { ensureAdminAccount } = await import('@/db/seed');
      await ensureAdminAccount();
    } catch (e) {
      console.error('ensureAdminAccount failed', e);
    }
    const { email, password } = await req.json();
    if (!validEmail(email || '') || !password) {
      return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim().toLowerCase()))
      .limit(1);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
    }
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'This account is not active. Please contact support.' },
        { status: 403 }
      );
    }

    const token = await createSession(user.id);
    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (e) {
    console.error('login error', e);
    return NextResponse.json({ error: 'Sign in failed. Please try again.' }, { status: 500 });
  }
}
