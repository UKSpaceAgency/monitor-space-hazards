'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getCdmsLatest(params: RequestParams = {}) {
  const { data } = await Api.getCdmsLatest(params);
  return { data };
};
