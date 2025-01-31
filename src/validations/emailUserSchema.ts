import { z } from 'zod';

export const emailUserSchema = z.object({
  email: z.string().email('Must be correct email format'),
});

export type EmailUserSchema = z.infer<typeof emailUserSchema>;
