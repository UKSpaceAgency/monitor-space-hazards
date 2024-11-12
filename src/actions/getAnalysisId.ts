'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getAnalysesAnalysisId(analysisId: string, params: RequestParams = {}) {
  const { data } = await Api.getAnalysesAnalysisId(analysisId, params);
  return { data };
};
