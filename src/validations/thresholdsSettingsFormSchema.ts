import { z } from 'zod';

export const thresholdsSettingsFormSchema = z.object({
  PROBABILITY_OF_COLLISION: z.number({
    invalid_type_error: 'Enter a positive number.',
  }).positive({
    message: 'Must be a positive number.',
  }).max(100, {
    message: 'Must be between 0% and 100%.',
  }),
  TOTAL_MISS_DISTANCE: z.number({
    invalid_type_error: 'Enter a positive number.',
  }).positive({
    message: 'Must be a positive number.',
  }),
  MEAN_RADIAL_MISS_DISTANCE: z.number({
    invalid_type_error: 'Enter a positive number.',
  }).positive({
    message: 'Must be a positive number.',
  }),
  TIME_TO_EVENT: z.number({
    invalid_type_error: 'Enter a positive number.',
  }).positive({
    message: 'Must be a positive number.',
  }),
});

export type ThresholdsSettingsFormSchema = z.infer<typeof thresholdsSettingsFormSchema>;
