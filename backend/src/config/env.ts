import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGINS: z.string().default('*'),
  JWT_SECRET: z.string().min(16).default('dev-only-secret-change-me-please'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PAYOUT_BANK_NAME: z.string().default(''),
  PAYOUT_ACCOUNT_NAME: z.string().default(''),
  PAYOUT_ACCOUNT_NUMBER: z.string().default(''),
  PAYSTACK_SECRET_KEY: z.string().default(''),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration', z.treeifyError(parsed.error));
  process.exit(1);
}

if (parsed.data.NODE_ENV === 'production' && parsed.data.JWT_SECRET.startsWith('dev-only')) {
  console.error('JWT_SECRET must be set in production');
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
