import { z } from 'zod';

export const contactAnalystFormDefaultValues = {
  messageContent: '',
};

export const contactAnalyst = z.object({
  messageContent: z.string()
    .min(1, 'Enter a message')
    .max(2000, 'Enter a message that is 2000 characters or fewer.'),
});

export type ContactAnalystSchema = z.infer<typeof contactAnalyst>;
