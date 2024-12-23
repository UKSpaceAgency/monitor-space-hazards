'use server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getExternalDataPerformance(
  query?: TypeGetExternalDataPerformanceParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getExternalDataPerformance(query, params);

  return data;
};
