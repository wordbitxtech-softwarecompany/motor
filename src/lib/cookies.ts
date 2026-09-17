/** HttpOnly cookie defaults — secure on HTTPS / Vercel so localhost still works. */
export function sessionCookieOptions(maxAge = 30 * 86400) {
  const secure =
    process.env.COOKIE_SECURE === 'true' ||
    process.env.VERCEL === '1' ||
    process.env.NODE_ENV === 'production';
  return {
    httpOnly: true as const,
    sameSite: 'lax' as const,
    path: '/',
    secure,
    maxAge,
  };
}
