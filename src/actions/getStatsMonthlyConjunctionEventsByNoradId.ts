'use server';

import type { TypeGetStatsMonthlyConjunctionEventsByNoradIdAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';

import type { StatsMonthlyConjunctionEvent } from './getStatsMonthlyConjunctionEvents';

type StatsMonthlyConjunctionEventsByNoradIdParams = {
  noradId: string;
  months: number;
};

export async function getStatsMonthlyConjunctionEventsByNoradId({ noradId, months }: StatsMonthlyConjunctionEventsByNoradIdParams): Promise<StatsMonthlyConjunctionEvent[]> {
  const queryParams: TypeGetStatsMonthlyConjunctionEventsByNoradIdAggregatedParams = {
    norad_id: noradId,
    end_date: dayjs().format(FORMAT_API_DATE),
  };
  if (months) {
    queryParams.start_date = dayjs().subtract(months, 'month').format(FORMAT_API_DATE);
  }

  try {
    const { data } = await Api.getStatsMonthlyConjunctionEventsByNoradIdAggregated(queryParams);

    if (data.length === 0) {
      return [];
    }

    return data.map(item => ({
      month: item.month ?? '',
      low: item['< 1e-5'] ?? 0,
      medium: item['1e-3 .. 1e-5'] ?? 0,
      high: item['> 1e-3'] ?? 0,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
