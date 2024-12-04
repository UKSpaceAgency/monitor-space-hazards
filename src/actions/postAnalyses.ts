'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import type { TypeBodyCreateAnalysisV1AnalysesPost } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function postAnalyses(_prevState: any, formData: FormData) {
  const payload: TypeBodyCreateAnalysisV1AnalysesPost = {
    event_short_id: formData.get('object_id') as string,
    json_file: formData.get('file') as File,
  };

  const response = await Api.postAnalyses(payload);

  const data = response.data as { message: { status: string; details: string }[] };

  // This is how analyses validation on backend works
  if (data?.message[0]?.status === 'ERROR') {
    return {
      error: data.message[0].details,
    };
  }

  revalidateTag(REVALIDATION_TAGS.GET_ANALYSES);
  redirect(`/conjunctions/${payload.event_short_id}/analysis-upload/successful`);
};
