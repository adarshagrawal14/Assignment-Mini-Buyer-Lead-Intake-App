import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// This checks if the DATABASE_URL is available. If not, it will stop the server.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// This creates the database connection client using the correct URL from your .env file.
const sql = neon(process.env.DATABASE_URL);

// This exports the fully configured Drizzle client for your application to use.
export const db = drizzle(sql, { schema });

