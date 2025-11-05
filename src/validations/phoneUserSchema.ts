import parsePhoneNumber from 'libphonenumber-js';
import { z } from 'zod';

export const phoneUserSchema = z.object({
  phone: z.string().transform((value, ctx) => {
    if (!value) {
      return value;
    }
    const phoneNumber = parsePhoneNumber(value, {
      defaultCountry: 'GB',
    });

    if (!phoneNumber?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter a valid phone number',
      });
      return z.NEVER;
    }

    return phoneNumber.formatInternational();
  }),
});

export type PhoneUserSchema = z.infer<typeof phoneUserSchema>;
