import { NextResponse } from 'next/server';
import { ensureDbInitialized } from '@/db/init';
import { sendPhoneOtp } from '@/lib/otp';

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database is not configured. Set DATABASE_URL on the server.' },
        { status: 503 }
      );
    }
    await ensureDbInitialized();
    const { phone } = await req.json();
    const result = await sendPhoneOtp(phone || '');
    if (!result.ok) {
      return NextResponse.json({ error: result.error || 'Could not send OTP.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      phone: result.phone,
      channel: result.channel,
      // Shown in UI when Twilio is not configured so signup still works
      ...(result.demoCode ? { demoCode: result.demoCode } : {}),
      message:
        result.channel === 'demo'
          ? 'SMS gateway not linked yet — use the on-screen code. Add Twilio env vars to send real SMS.'
          : 'OTP sent to your mobile number.',
    });
  } catch (e) {
    console.error('otp send error', e);
    return NextResponse.json({ error: 'Could not send OTP. Try again.' }, { status: 500 });
  }
}
