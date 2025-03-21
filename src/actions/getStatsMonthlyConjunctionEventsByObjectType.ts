'use server';

import { groupBy } from 'lodash';

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
  const { data } = await Api.getStatsMonthlyConjunctionEventsByObjectType(query);

  const groupedByMonth = groupBy(data, 'month');

  const groupedData = Object.entries(groupedByMonth).map(([month, events]) => {
    const DEBRIS = events.find(event => event.eventType === 'Events with debris')?.count || 0;
    const ANOTHER_SATELLITE = events.find(event => event.eventType === 'Events with another satellite')?.count || 0;
    const WITH_UK_SATELLITES = events.find(event => event.eventType === 'Events with two UK-licensed satellites')?.count || 0;
    const OTHER = events.find(event => event.eventType === 'Events with other objects (unknown/rocket body)')?.count || 0;
    return {
      month: dayjs(month).format('MM/YYYY'),
      DEBRIS,
      ANOTHER_SATELLITE,
      WITH_UK_SATELLITES,
      OTHER,
    };
  });

  return groupedData;
}
