import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

import { AccountType } from '@/utils/Roles';
import { getZodEnumFromObjectKeys } from '@/utils/Zod';

export const addNewUserSchema = z.object({
  organization_id: z.string({
    invalid_type_error: 'Select an organisation from the list.',
  }),
  first_name: z.string().min(1, 'Enter a first name'),
  last_name: z.string().min(1, 'Enter a last name'),
  email: z.string().email('Enter an email address in the correct format, like name@example.com'),
  phone_number: z.string().transform((value, ctx) => {
    if (!value) {
      return value;
    }
    const phone_number = parsePhoneNumber(value, {
      defaultCountry: 'GB',
    });

    if (!phone_number?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192',
      });
      return z.NEVER;
    }

    return phone_number.formatInternational();
  }).optional(),
  role: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Select an account type',
  }),
});

export type AddNewUserSchema = z.infer<typeof addNewUserSchema>;
