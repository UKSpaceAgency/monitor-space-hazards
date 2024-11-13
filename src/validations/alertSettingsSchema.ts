import { z } from 'zod';

export const alertSettingsSchema = z.object({
  conjunctionAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
  ]),
  receiveConjunction: z.array(z.union([z.literal('EMAIL'), z.literal('SMS')])).length(1, { message: 'Field is required.' }),
  reEntryAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
    z.literal('uk_satellites_only'),
  ]),
  receiveReEntry: z.array(z.union([z.literal('EMAIL'), z.literal('SMS')])).length(1, { message: 'Field is required.' }),
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
