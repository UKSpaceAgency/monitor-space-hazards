'use server';

import type { TypeGetStatsMonthlyManoeuvrePlotsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsMonthlyManoeuvrePlots(query?: TypeGetStatsMonthlyManoeuvrePlotsParams) {
  const { data } = await Api.getStatsMonthlyManoeuvrePlots(query);
  return data;
};
