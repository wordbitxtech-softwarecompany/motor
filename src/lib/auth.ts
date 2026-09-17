// Server-only module: uses next/headers and node:crypto.
import { cookies } from 'next/headers';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { eq, and, gt } from 'drizzle-orm';
import { db } from '@/db';
import { users, sessions } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';

import { sessionCookieOptions as cookieOpts } from '@/lib/cookies';
import { normalisePhone as normPhone } from '@/lib/phone';

export const SESSION_COOKIE = 'motor_session';
const SESSION_DAYS = 30;

export function sessionCookieOptions(maxAge = SESSION_DAYS * 86400) {
  return cookieOpts(maxAge);
}

/* ── Password hashing (scrypt, salted) ───────────────── */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, 'hex');
  if (keyBuf.length !== derived.length) return false;
  return timingSafeEqual(derived, keyBuf);
}

/* ── Sessions ────────────────────────────────────────── */

export async function createSession(userId: number): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 864e5);
  await db.insert(sessions).values({ token, userId, expiresAt });
  return token;
}

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
}

/** Reads the session cookie and resolves the signed-in user (or null). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    await ensureDbInitialized();
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const [row] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        city: users.city,
        role: users.role,
        status: users.status,
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
      .limit(1);

    if (!row || row.status !== 'active') return null;
    const { status, ...user } = row;
    return user;
  } catch {
    return null;
  }
}

export async function destroySession(token: string) {
  try {
    await db.delete(sessions).where(eq(sessions.token, token));
  } catch {
    /* ignore */
  }
}

export async function requireAdmin(): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  return user?.role === 'admin' ? user : null;
}

/* ── Validation helpers ──────────────────────────────── */

export function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

export const normalisePhone = normPhone;
