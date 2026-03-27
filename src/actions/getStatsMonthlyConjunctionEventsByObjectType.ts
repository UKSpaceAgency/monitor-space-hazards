'use server';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export type StatsMonthlyConjunctionEventsByObjectType = {
  month: string;
  DEBRIS: number;
  ANOTHER_SATELLITE: number;
  WITH_UK_SATELLITES: number;
  OTHER: number;
};

export async function getStatsMonthlyConjunctionEventsByObjectType(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyConjunctionEventsByObjectType[]> {
  const { data } = await Api.getStatsMonthlyConjunctionEventsByObjectTypeAggregated(query);

  return data.map((event) => {
    const DEBRIS = event['Events with debris'] || 0;
    const ANOTHER_SATELLITE = event['Events with another satellite'] || 0;
    const WITH_UK_SATELLITES = event['Events with two UK-licensed satellites'] || 0;
    const OTHER = event['Events with other objects (unknown/rocket body)'] || 0;
    return {
      month: dayjs(event.month).format('MM/YYYY'),
      DEBRIS,
      ANOTHER_SATELLITE,
      WITH_UK_SATELLITES,
      OTHER,
    };
  });
}
