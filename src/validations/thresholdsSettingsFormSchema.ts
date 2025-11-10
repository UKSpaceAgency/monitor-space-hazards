import { z } from 'zod';

export const thresholdsSettingsFormSchema = z.object({
  PROBABILITY_OF_COLLISION: z.number({
    invalid_type_error: 'Enter a probability of collision',
  }).positive({
    message: 'Enter a probability of collision that is greater than 0',
  }).max(100, {
    message: 'Enter a probability of collision between 0% and 100%',
  }),
  TOTAL_MISS_DISTANCE: z.number({
    invalid_type_error: 'Enter a total miss distance',
  }).positive({
    message: 'Enter a total miss distance that is greater than 0',
  }),
  MEAN_RADIAL_MISS_DISTANCE: z.number({
    invalid_type_error: 'Enter a mean radial miss distance',
  }).positive({
    message: 'Enter a mean radial miss distance that is greater than 0',
  }),
  TIME_TO_EVENT: z.number({
    invalid_type_error: 'Enter a time to event',
  }).positive({
    message: 'Enter a time to event that is greater than 0',
  }),
});

export type ThresholdsSettingsFormSchema = z.infer<typeof thresholdsSettingsFormSchema>;
