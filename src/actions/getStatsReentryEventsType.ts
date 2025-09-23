'use server';

import type { TypeGetStatsReentryEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsReentryEventsType(query?: TypeGetStatsReentryEventsParams) {
  const { data } = await Api.getStatsReentryEvents(query);
  const order = ['Payload', 'Debris', 'Rocket Body', 'Unknown', 'Total'];
  data.sort((a, b) => order.indexOf(a.objectType) - order.indexOf(b.objectType));
  return data;
};
