'use server';

import type { TypeGetStatsFragmentationEventsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsFragmentationEventsType(query?: TypeGetStatsFragmentationEventsParams) {
  const { data } = await Api.getStatsFragmentationEventsByFragmentationType(query);
  const order = ['Debris', 'Payload', 'Rocket Body', 'Unknown', 'Total'];
  data.sort((a, b) => order.indexOf(a.fragmentationType) - order.indexOf(b.fragmentationType));
  return data;
};
