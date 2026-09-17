import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

/** Neon / Supabase / Vercel Postgres need TLS in production. */
function poolSsl(): false | { rejectUnauthorized: boolean } {
  if (/localhost|127\.0\.0\.1/.test(databaseUrl!)) return false;
  if (/sslmode=disable/i.test(databaseUrl!)) return false;
  return { rejectUnauthorized: false };
}

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
    ssl: poolSsl(),
    max: 5,
    connectionTimeoutMillis: 8_000,
    idleTimeoutMillis: 20_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
