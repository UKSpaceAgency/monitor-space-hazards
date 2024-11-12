'use server';

import type { TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getAnalyses(query?: TypeGetAnalysesParams, params: RequestParams = {}) {
  const { data } = await Api.getAnalyses(query, {
    next: { tags: [REVALIDATION_TAGS.GET_ANALYSES] },
    ...params,
  });
  return data;
};
