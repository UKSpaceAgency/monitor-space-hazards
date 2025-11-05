import { z } from 'zod';

export const emailUserSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export type EmailUserSchema = z.infer<typeof emailUserSchema>;
