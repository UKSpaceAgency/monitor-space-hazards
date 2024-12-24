'use server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsEventsType(query?: TypeGetStatsEventsTypeParams) {
  const { data } = await Api.getStatsEventsType(query);
  return data;
};
