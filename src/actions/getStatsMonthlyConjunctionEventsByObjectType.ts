'use server';

import { groupBy } from 'lodash';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

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
    const byType = groupBy(events, 'objectType');
    return {
      month,
      DEBRIS: byType.DEBRIS?.[0]?.count ?? 0,
      SATELLITE: byType.SATELLITE?.[0]?.count ?? 0,
      ROCKET_BODY: byType.ROCKET_BODY?.[0]?.count ?? 0,
      OTHER: byType.OTHER?.[0]?.count ?? 0,
    };
  });

  return groupedData;
}
