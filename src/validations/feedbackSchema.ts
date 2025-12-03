import { z } from 'zod';

export const feedBackFormDefaultValues = {
  satisfaction: '',
  details: '',
};

export const feedbackSchema = z.object({
  satisfaction: z.string({
    invalid_type_error: 'Select your satisfaction level',
  }).refine(value => value, 'Select your satisfaction level'),
  details: z.string()
    .min(1, 'Enter your satisfaction details')
    .max(2000, 'Enter your satisfaction details that is 2000 characters or fewer.'),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
