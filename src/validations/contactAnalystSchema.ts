import { z } from 'zod';

export const contactAnalystFormDefaultValues = {
  messageContent: '',
};

export const contactAnalyst = z.object({
  messageContent: z.string()
    .min(1, 'Field is required')
    .max(2000, 'Your text must be 2000 characters or fewer.'),
});

export type ContactAnalystSchema = z.infer<typeof contactAnalyst>;
