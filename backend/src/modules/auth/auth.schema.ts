import { z } from 'zod';

const email = z.email().trim().toLowerCase();

export const LoginBody = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});
export type LoginBody = z.infer<typeof LoginBody>;

export const RegisterBody = z.object({
  name: z.string().trim().min(2).max(60),
  email,
  password: z.string().min(8, 'Use at least 8 characters'),
});
export type RegisterBody = z.infer<typeof RegisterBody>;
