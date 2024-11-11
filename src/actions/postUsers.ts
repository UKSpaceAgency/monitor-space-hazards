'use server';

import { z } from 'zod';

import type { TypeHTTPValidationError, TypeUserIdOut, TypeUserIn } from '@/__generated__/data-contracts';
import type { HttpResponse } from '@/__generated__/http-client';
import Api from '@/libs/Api';
import { transformZodErrors } from '@/utils/Zod';
import { type AddNewUserSchema, addNewUserSchema } from '@/validations/addNewUserSchema';

export async function postUsers(formData: AddNewUserSchema) {
  try {
    addNewUserSchema.parse(formData);

    const { data } = await Api.postUsers(formData as TypeUserIn);

    return {
      errors: null,
      data,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
      };
    }
    if (error instanceof Response) {
      // This is how email validation on backend works
      const { detail } = (error as HttpResponse<TypeUserIdOut, TypeHTTPValidationError>).error;
      if (typeof detail === 'string') {
        return {
          errors: [{
            path: 'email',
            message: detail,
          }],
        };
      }
    }
    return {
      errors: [{
        path: 'root',
        message: 'An unexpected error occurred.',
      }],
    };
  }
};
