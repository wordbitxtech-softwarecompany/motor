import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { hashPassword, createSession, SESSION_COOKIE, validEmail, normalisePhone } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const { name, email, phone, city, password } = await req.json();

    if (!name?.trim() || name.trim().length < 2) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    if (!validEmail(email || '')) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    const normPhone = normalisePhone(phone || '');
    if (!normPhone) return NextResponse.json({ error: 'Enter a valid Pakistani mobile number (e.g. 0301 2345678).' }, { status: 400 });
    if (!city?.trim()) return NextResponse.json({ error: 'Please select your city.' }, { status: 400 });
    if (!password || password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });

    const cleanEmail = email.trim().toLowerCase();
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, cleanEmail)).limit(1);
    if (existing) return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 });

    const [user] = await db.insert(users).values({
      name: name.trim(),
      email: cleanEmail,
      phone: normPhone,
      city: city.trim(),
      passwordHash: hashPassword(password),
      role: 'user',
    }).returning({ id: users.id, name: users.name, email: users.email });

    const token = await createSession(user.id);
    const res = NextResponse.json({ success: true, user });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true, sameSite: 'lax', path: '/', secure: true, maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (e: any) {
    console.error('signup error', e);
    return NextResponse.json({ error: 'Could not create your account. Please try again.' }, { status: 500 });
  }
}
