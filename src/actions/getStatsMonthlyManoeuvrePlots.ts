'use server';

import type { TypeGetStatsMonthlyManoeuvrePlotsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export async function getStatsMonthlyManoeuvrePlots(query?: TypeGetStatsMonthlyManoeuvrePlotsParams) {
  const { data } = await Api.getStatsMonthlyManoeuvrePlots(query);
  return data.map(({ month, count }) => ({
    month: dayjs(month).format('MM/YYYY'),
    count,
  }));
};
