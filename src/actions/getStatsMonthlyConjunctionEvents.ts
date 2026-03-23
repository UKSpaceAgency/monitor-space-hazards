'use server';

import type { TypeGetStatsMonthlyConjunctionEventsAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';

type StatsMonthlyConjunctionEventsParams = {
  months: number;
};

export type StatsMonthlyConjunctionEvent = {
  month: string;
  low: number;
  medium: number;
  high: number;
};

export async function getStatsMonthlyConjunctionEvents({ months }: StatsMonthlyConjunctionEventsParams): Promise<StatsMonthlyConjunctionEvent[]> {
  const queryParams: TypeGetStatsMonthlyConjunctionEventsAggregatedParams = {
    end_date: dayjs().format(FORMAT_API_DATE),
  };
  if (months) {
    queryParams.start_date = dayjs().subtract(months, 'month').format(FORMAT_API_DATE);
  }

  try {
    const { data } = await Api.getStatsMonthlyConjunctionEventsAggregated(queryParams);

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
