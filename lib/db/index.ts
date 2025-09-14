import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// This line ensures that only the DATABASE_URL is used for the connection.
// The "!" tells TypeScript we are certain this variable exists.
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });