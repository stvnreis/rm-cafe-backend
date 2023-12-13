import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_TEST_URL: z.string().url().optional(),
  PORT: z.coerce.number().optional().default(3000),
  VERSION: z.string().optional().default('1.0.0'),
  HOST: z.string(),
  DATABASE_PORT: z.coerce.number().optional().default(5432),
});

export type Env = z.infer<typeof envSchema>;
