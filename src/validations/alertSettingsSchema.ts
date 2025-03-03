import { z } from 'zod';

const receiveDefault = z.array(z.enum([
  'SMS',
  'EMAIL',
]));

export const alertSettingsSchema = z.object({
  conjunctionAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
  ]),
  receiveConjunction: receiveDefault,
  reEntryAlerts: z.union([
    z.literal('all'),
    z.literal('none'),
    z.literal('priority'),
    z.literal('uk_satellites_only'),
  ]),
  receiveReEntry: receiveDefault,
  areasOfInterest: z.array(z.enum([
    'ENGLAND',
    'NORTHERN_IRELAND',
    'SCOTLAND',
    'WALES',
    'BRITISH_OVERSEAS_TERRITORIES',
    'SHANWICK',
    'NAVAREA',
    'LONDON_FIR',
    'SCOTLAND_FIR',
    'REST_OF_THE_WORLD',
  ])),
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
