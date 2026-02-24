'use server';

import type { TypeGetStatsReentryEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsReentryEventsType(query?: TypeGetStatsReentryEventsParams) {
  const { data } = await Api.getStatsReentryEvents(query);
  const order = ['Payload', 'Rocket Body', 'Debris', 'Unknown', 'Total'];
  data.sort((a, b) => order.indexOf(a.object_type) - order.indexOf(b.object_type));
  return data;
};
