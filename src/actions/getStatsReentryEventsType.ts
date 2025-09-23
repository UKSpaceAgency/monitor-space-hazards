'use server';

import type { TypeGetStatsReentryEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsReentryEventsType(query?: TypeGetStatsReentryEventsParams) {
  const { data } = await Api.getStatsReentryEvents(query);
  return data;
};
