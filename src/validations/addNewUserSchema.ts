import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

import { AccountType } from '@/utils/Roles';
import { getZodEnumFromObjectKeys } from '@/utils/Zod';

export const addNewUserSchema = z.object({
  organization_id: z.string({
    invalid_type_error: 'Select your organisation from the list.',
  }),
  first_name: z.string().min(1, 'Enter your first name'),
  last_name: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Enter an email address in the correct format, like name@example.com'),
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
        message: 'Enter a phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192',
      });
      return z.NEVER;
    }

    return phoneNumber.formatInternational();
  }).optional(),
  role: getZodEnumFromObjectKeys<typeof AccountType>(AccountType, {
    invalid_type_error: 'Select an account type',
  }),
});

export type AddNewUserSchema = z.infer<typeof addNewUserSchema>;
