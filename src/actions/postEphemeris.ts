'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeBodyCreateEphemerisV1EphemerisPost, TypeHTTPValidationError, TypeUserIdOut } from '@/__generated__/data-contracts';
import type { HttpResponse } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function postEphemeris(_prevState: any, formData: FormData) {
  const data: TypeBodyCreateEphemerisV1EphemerisPost = {
    object_id: formData.get('object_id') as string,
    file: formData.get('file') as File,
  };
  try {
    await Api.postEphemeris(data);
  } catch (error) {
    if (error instanceof Response) {
      // This is how email validation on backend works
      const { detail } = (error as HttpResponse<TypeUserIdOut, TypeHTTPValidationError>).error;
      if (typeof detail === 'string') {
        return {
          error: detail,
        };
      }
    }
    return {
      error: 'An unexpected error occurred.',
    };
  }
  revalidateTag(REVALIDATION_TAGS.GET_EPHEMERISES);
  redirect(`/satellites/${data.object_id}/ephemeris-upload/upload-success`);
};
