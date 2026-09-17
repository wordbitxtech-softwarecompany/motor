import { NextResponse } from 'next/server';
import { sendPhoneOtp, OTP_COOKIE } from '@/lib/otp';
import { sessionCookieOptions } from '@/lib/cookies';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await sendPhoneOtp(String(body.phone || ''));
    if (!result.ok) {
      return NextResponse.json({ error: result.error || 'Could not send OTP.' }, { status: 400 });
    }

    const res = NextResponse.json({
      success: true,
      phone: result.phone,
      channel: result.channel,
      ...(result.demoCode ? { demoCode: result.demoCode } : {}),
      message:
        result.channel === 'demo'
          ? 'SMS not delivered yet — use the on-screen code. Check Twilio env on Vercel (Verify SID or Phone Number).'
          : 'OTP sent to your mobile number.',
    });

    if (result.cookie) {
      res.cookies.set(OTP_COOKIE, result.cookie, {
        ...sessionCookieOptions(10 * 60),
        httpOnly: true,
      });
    }
    return res;
  } catch (e) {
    console.error('otp send error', e);
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json(
      {
        error: 'Could not send OTP. Please try again.',
        detail: process.env.NODE_ENV === 'production' ? undefined : msg,
      },
      { status: 500 }
    );
  }
}
