import { z } from 'zod';

const receiveDefault = z.array(z.enum([
  'SMS',
  'EMAIL',
]));

export const alertSettingsSchema = z.object({
  conjunctionAlerts: z.array(z.enum([
    'warning',
    'uk-licensed',
    'alert',
  ])),
  receiveConjunction: receiveDefault,
  reEntryAlerts: z.array(z.enum([
    'warning',
    'uk-licensed',
    'alert',
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
    'warning',
    'alert',
  ])),
  receiveFragmentation: receiveDefault,
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
