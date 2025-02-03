import { z } from 'zod';

import { AccountType } from '@/utils/Roles';
import { getZodEnumFromObjectKeys } from '@/utils/Zod';

export const roleUserSchema = z.object({
  role: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Field is required.',
  }),
});

export type RoleUserSchema = z.infer<typeof roleUserSchema>;
