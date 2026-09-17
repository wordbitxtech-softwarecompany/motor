import { databaseConnectionMeta, pool } from '@/db';

export const dynamic = 'force-dynamic';

function serializeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error).slice(0, 280);
  const err = error as Error & { cause?: unknown; code?: string };
  const cause =
    err.cause instanceof Error
      ? err.cause.message
      : typeof err.cause === 'string'
        ? err.cause
        : err.code || '';
  return `${err.message}${cause ? ` | ${cause}` : ''}`.slice(0, 280);
}

export async function GET() {
  const hasDb = Boolean(
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING
  );
  const hasTwilio =
    Boolean(process.env.TWILIO_ACCOUNT_SID?.trim()) && Boolean(process.env.TWILIO_AUTH_TOKEN?.trim());
  const hasVerify = Boolean(process.env.TWILIO_VERIFY_SERVICE_SID?.trim());
  const hasFrom = Boolean(process.env.TWILIO_PHONE_NUMBER?.trim());

  let dbOk = false;
  let dbError: string | undefined;
  if (hasDb) {
    try {
      await pool.query('select 1');
      dbOk = true;
    } catch (e) {
      dbError = serializeError(e);
    }
  }

  return Response.json(
    {
      ok: dbOk,
      database: hasDb ? (dbOk ? 'connected' : 'error') : 'missing_DATABASE_URL',
      source: databaseConnectionMeta.source,
      usingPooler: databaseConnectionMeta.usingPooler,
      dbHost: databaseConnectionMeta.host,
      dbError,
      hint: !dbOk && hasDb
        ? 'Direct db.*.supabase.co fails on Vercel (IPv6). Use Session pooler *.pooler.supabase.com:5432, or wait for auto-rewrite deploy.'
        : undefined,
      twilio: hasTwilio
        ? hasVerify
          ? 'verify_configured'
          : hasFrom
            ? 'sms_configured'
            : 'sid_token_only_add_VERIFY_or_PHONE'
        : 'not_configured',
    },
    { status: dbOk ? 200 : 503 }
  );
}
