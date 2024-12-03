'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeBodyCreateAnalysisV1AnalysesPost, TypeHTTPValidationError, TypeUserIdOut } from '@/__generated__/data-contracts';
import type { HttpResponse } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function postAnalyses(_prevState: any, formData: FormData) {
  const data: TypeBodyCreateAnalysisV1AnalysesPost = {
    event_short_id: formData.get('object_id') as string,
    json_file: formData.get('file') as File,
  };
  try {
    await Api.postAnalyses(data);
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
  revalidateTag(REVALIDATION_TAGS.GET_ANALYSES);
  redirect(`/conjunctions/${data.event_short_id}/analysis-upload/successful`);
};
