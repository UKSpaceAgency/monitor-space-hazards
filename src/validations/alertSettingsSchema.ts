import { z } from 'zod';

export const alertSettingsSchema = z.object({
  conjunctionAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
  ]),
  receiveConjunction: z.array(z.union([z.literal('EMAIL'), z.literal('SMS')])),
  reEntryAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
    z.literal('uk_satellites_only'),
  ]),
  receiveReEntry: z.array(z.union([z.literal('EMAIL'), z.literal('SMS')])),
  areasOfInterest: z.array(z.union([
    z.literal('ENGLAND'),
    z.literal('NORTHERN_IRELAND'),
    z.literal('SCOTLAND'),
    z.literal('WALES'),
    z.literal('BRITISH_OVERSEAS_TERRITORIES'),
    z.literal('SHANWICK'),
    z.literal('NAVAREA'),
    z.literal('REST_OF_THE_WORLD'),
  ])),
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
