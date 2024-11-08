'use server';

import type { TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getAnalyses(query?: TypeGetAnalysesParams, params: RequestParams = {}) {
  const { data } = await Api.getAnalyses(query, params);
  return { data };
};
