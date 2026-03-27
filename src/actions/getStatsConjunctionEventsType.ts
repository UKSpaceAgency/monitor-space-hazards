'use server';

import type { TypeGetStatsEventsTypeAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsConjunctionEventsType(query?: TypeGetStatsEventsTypeAggregatedParams) {
  const { data } = await Api.getStatsEventsTypeAggregated(query);
  return data;
};
