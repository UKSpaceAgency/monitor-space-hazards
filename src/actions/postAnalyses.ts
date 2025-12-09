'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeBodyCreateAnalysisV1AnalysesPost, TypeHTTPValidationError } from '@/__generated__/data-contracts';
import type { HttpResponse } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function postAnalyses(_prevState: any, formData: FormData) {
  const payload: TypeBodyCreateAnalysisV1AnalysesPost = {
    event_short_id: formData.get('object_id') as string,
    json_file: formData.get('file') as File,
  };

  try {
    await Api.postAnalyses(payload);
    revalidateTag(REVALIDATION_TAGS.GET_ANALYSES);
    redirect(`/conjunctions/${payload.event_short_id}/analysis-upload/successful`);
  } catch (error) {
    if (error instanceof Response) {
      const { detail } = (error as HttpResponse<TypeBodyCreateAnalysisV1AnalysesPost, TypeHTTPValidationError>).error;
      if (typeof detail === 'string') {
        return {
          error: detail,
        };
      }
    }
    return {
      error: 'An error occurred while uploading the analysis',
    };
  }
};
