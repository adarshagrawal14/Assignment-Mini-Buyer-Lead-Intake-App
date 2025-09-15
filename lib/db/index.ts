import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// This checks if the DATABASE_URL is available. If not, it will stop the server.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a node-postgres pool compatible with Supabase Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Export Drizzle client using node-postgres
export const db = drizzle(pool, { schema });

