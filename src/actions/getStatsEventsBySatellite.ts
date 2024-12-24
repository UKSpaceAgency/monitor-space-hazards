'use server';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsEventsBySatellite(query?: TypeGetStatsEventsBySatelliteParams) {
  const { data } = await Api.getStatsEventsBySatellite(query);
  return data;
};
