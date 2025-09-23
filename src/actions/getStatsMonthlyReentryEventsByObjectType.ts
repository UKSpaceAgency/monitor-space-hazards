'use server';

import { groupBy } from 'lodash';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export type StatsMonthlyReentryEventsByObjectType = {
  month: string;
  DEBRIS: number;
  PAYLOAD: number;
  ROCKET_BODY: number;
  UNKNOWN: number;
};

export async function getStatsMonthlyReentryEventsByObjectType(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyReentryEventsByObjectType[]> {
  const { data } = await Api.getStatsMonthlyReentryEventsByObjectType(query);

  const groupedByMonth = groupBy(data, 'month');

  const groupedData = Object.entries(groupedByMonth).map(([month, events]) => {
    const DEBRIS = events.find(event => event.objectType === 'Debris')?.count || 0;
    const PAYLOAD = events.find(event => event.objectType === 'Payload')?.count || 0;
    const ROCKET_BODY = events.find(event => event.objectType === 'Rocket Body')?.count || 0;
    const UNKNOWN = events.find(event => event.objectType === 'Unknown')?.count || 0;
    return {
      month: dayjs(month).format('MM/YYYY'),
      DEBRIS,
      PAYLOAD,
      ROCKET_BODY,
      UNKNOWN,
    };
  });

  return groupedData;
}
