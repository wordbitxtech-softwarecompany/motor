import { db } from '@/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasDb = Boolean(process.env.DATABASE_URL);
  const hasTwilio =
    Boolean(process.env.TWILIO_ACCOUNT_SID?.trim()) && Boolean(process.env.TWILIO_AUTH_TOKEN?.trim());
  const hasVerify = Boolean(process.env.TWILIO_VERIFY_SERVICE_SID?.trim());
  const hasFrom = Boolean(process.env.TWILIO_PHONE_NUMBER?.trim());

  let dbOk = false;
  let dbError: string | undefined;
  if (hasDb) {
    try {
      await db.execute(sql`select 1`);
      dbOk = true;
    } catch (e) {
      dbError = e instanceof Error ? e.message.slice(0, 160) : 'db_error';
    }
  }

  return Response.json({
    ok: dbOk,
    database: hasDb ? (dbOk ? 'connected' : 'error') : 'missing_DATABASE_URL',
    dbError,
    twilio: hasTwilio
      ? hasVerify
        ? 'verify_configured'
        : hasFrom
          ? 'sms_configured'
          : 'sid_token_only_add_VERIFY_or_PHONE'
      : 'not_configured',
  }, { status: dbOk ? 200 : 503 });
}
