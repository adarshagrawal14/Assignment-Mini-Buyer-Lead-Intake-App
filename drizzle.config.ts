import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: "db.umcvkxzclirmiepdrisv.supabase.co",
    port: 5432,
    user: "postgres",
    password: "MP16c9181",
    database: "postgres",
    ssl: "require",
  },
} satisfies Config;