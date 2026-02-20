'use server';

import { groupBy } from 'lodash';

import type { TypeGetStatsMonthlyConjunctionEventsParams } from '@/__generated__/data-contracts';
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
  const queryParams: TypeGetStatsMonthlyConjunctionEventsParams = {
    end_date: dayjs().format(FORMAT_API_DATE),
  };
  if (months) {
    queryParams.start_date = dayjs().subtract(months, 'month').format(FORMAT_API_DATE);
  }

  try {
    const { data } = await Api.getStatsMonthlyConjunctionEvents(queryParams);

    const groupedByMonth = groupBy(data, 'month');

    const groupedData = Object.entries(groupedByMonth).map(([month, events]) => {
      const high = events.find(event => event.collision_probability_range === '> 1e-3')?.count ?? 0;
      const medium = events.find(event => event.collision_probability_range === '1e-3 .. 1e-5')?.count ?? 0;
      const low = events.find(event => event.collision_probability_range === '< 1e-5')?.count ?? 0;
      return {
        month: dayjs(month).format('MM/YYYY'),
        high,
        medium,
        low,
      };
    });

    return groupedData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
