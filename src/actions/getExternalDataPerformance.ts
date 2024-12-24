'use server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getExternalDataPerformance(
  query?: TypeGetExternalDataPerformanceParams,
) {
  const { data } = await Api.getExternalDataPerformance(query);

  return data;
};
