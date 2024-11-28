import { z } from 'zod';

export const feedBackFormDefaultValues = {
  details: '',
  satisfaction: '',
};

export const feedbackSchema = z.object({
  satisfaction: z.string().nullable().refine(value => value, 'You must select one option.'),
  details: z.string()
    .min(1, 'Field is required')
    .max(2000, 'Your text must be 2000 characters or fewer.'),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
