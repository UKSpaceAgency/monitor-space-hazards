'use server';

import { groupBy } from 'lodash';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export type StatsMonthlyConjunctionEventsByObjectType = {
  month: string;
  DEBRIS: number;
  SATELLITE: number;
  ROCKET_BODY: number;
  OTHER: number;
};

export async function getStatsMonthlyConjunctionEventsByObjectType(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyConjunctionEventsByObjectType[]> {
  const { data } = await Api.getStatsMonthlyConjunctionEventsByObjectType(query);

  const groupedByMonth = groupBy(data, 'month');

  const groupedData = Object.entries(groupedByMonth).map(([month, events]) => {
    const DEBRIS = events.filter(event => event.objectType === 'DEBRIS').reduce((acc, event) => acc + event.count, 0);
    const SATELLITE = events.filter(event => event.objectType === 'PAYLOAD').reduce((acc, event) => acc + event.count, 0);
    const ROCKET_BODY = events.filter(event => event.objectType === 'ROCKET BODY').reduce((acc, event) => acc + event.count, 0);
    const OTHER = events.filter(event => event.objectType === 'UNKNOWN').reduce((acc, event) => acc + event.count, 0);
    return {
      month: dayjs(month).format('MM/YYYY'),
      DEBRIS,
      SATELLITE,
      ROCKET_BODY,
      OTHER,
    };
  });

  return groupedData;
}
