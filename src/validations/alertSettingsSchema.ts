import { z } from 'zod';

import { AccountType } from '@/utils/Roles';
import { getZodEnumFromObjectKeys } from '@/utils/Zod';

export const alertSettingsSchema = z.object({
  conjunctionAlerts: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Field is required.',
  }),
  receiveConjunction: z.string().array(),
  reEntryAlerts: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Field is required.',
  }),
  receiveReEntry: z.string().array(),
});

export type AlertSettingsSchema = z.infer<typeof alertSettingsSchema>;
