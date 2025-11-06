import { z } from 'zod';

export const emailUserSchema = z.object({
  email: z.string().email('Enter an email address in the correct format, like name@example.com'),
});

export type EmailUserSchema = z.infer<typeof emailUserSchema>;
