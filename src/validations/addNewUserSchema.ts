import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

import { AccountType } from '@/utils/Roles';
import { getZodEnumFromObjectKeys } from '@/utils/Zod';

export const addNewUserSchema = z.object({
  organization_id: z.string({
    invalid_type_error: 'Field is required.',
  }),
  first_name: z.string().min(1, 'Field is required.'),
  last_name: z.string().min(1, 'Field is required.'),
  email: z.string().email('Must be correct email format'),
  role: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Field is required.',
  }),
  phone_number: z.string().transform((value, ctx) => {
    if (!value) {
      return value;
    }
    const phoneNumber = parsePhoneNumber(value, {
      defaultCountry: 'GB',
    });

    if (!phoneNumber?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
      });
      return z.NEVER;
    }

    return phoneNumber.formatInternational();
  }).optional(),
});

export type AddNewUserSchema = z.infer<typeof addNewUserSchema>;
