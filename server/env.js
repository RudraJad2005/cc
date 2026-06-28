const { z } = require('zod');
require('dotenv').config();

const envSchema = z.object({
  ALLOWED_ORIGINS: z.string().default('*'),
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  PORT: z.string().default('4000')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables in IDE Server:");
  console.error(_env.error.format());
  process.exit(1);
}

module.exports = { env: _env.data };
