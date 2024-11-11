'use server';

import { revalidateTag } from 'next/cache';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function deleteAnalysesAnalysisId(analysisId: string, params: RequestParams = {}) {
  const { data } = await Api.deleteAnalysesAnalysisId(analysisId, params);

  revalidateTag(REVALIDATION_TAGS.GET_ANALYSES);
  return { data };
};
