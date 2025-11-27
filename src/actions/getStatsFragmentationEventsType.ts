'use server';

import type { TypeGetStatsFragmentationEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsFragmentationEventsType(query?: TypeGetStatsFragmentationEventsParams) {
  const { data } = await Api.getStatsFragmentationEvents(query);
  const order = ['Payload', 'Rocket Body', 'Debris', 'Unknown', 'Total'];
  data.sort((a, b) => order.indexOf(a.objectType) - order.indexOf(b.objectType));
  return data;
};
