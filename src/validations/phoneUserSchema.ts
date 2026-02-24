import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

export const phoneUserSchema = z.object({
  phone: z.string().transform((value, ctx) => {
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
  }),
});

export type PhoneUserSchema = z.infer<typeof phoneUserSchema>;
