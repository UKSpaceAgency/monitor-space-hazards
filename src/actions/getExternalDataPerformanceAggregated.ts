'use server';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getExternalDataPerformanceAggregated(
  query?: TypeGetExternalDataPerformanceAggregatedParams,
) {
  const { data } = await Api.getExternalDataPerformanceAggregated(query);

  return data;
};
