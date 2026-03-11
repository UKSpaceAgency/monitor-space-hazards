import { z } from 'zod';

const receiveDefault = z.array(z.enum([
  'SMS',
  'EMAIL',
]));

export const alertSettingsSchema = z.object({
  conjunctionAlerts: z.array(z.enum([
    'priority',
    'uk-licensed',
    'standard',
  ])),
  receiveConjunction: receiveDefault,
  reEntryAlerts: z.array(z.enum([
    'priority',
    'uk-licensed',
    'standard',
  ])),
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
  fragmentationAlerts: z.array(z.enum([
    'priority',
    'standard',
  ])),
  receiveFragmentation: receiveDefault,
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
