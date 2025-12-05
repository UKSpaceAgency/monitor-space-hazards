'use server';

import { groupBy } from 'lodash';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export type StatsMonthlyFragmentationEventsByObjectType = {
  month: string;
  ACCIDENTAL: number;
  AERODYNAMICS: number;
  ANOMALOUS: number;
  COLLISION: number;
  DELIBERATE: number;
  ELECTRICAL: number;
  EXPLOSION: number;
  PROPULSION: number;
  SMALL_IMPACTOR: number;
  UNKNOWN: number;
};

export async function getStatsMonthlyFragmentationEventsByObjectType(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyFragmentationEventsByObjectType[]> {
  const { data } = await Api.getStatsMonthlyFragmentationEventsByFragmentationType(query);

  const groupedByMonth = groupBy(data, 'month');

  const groupedData = Object.entries(groupedByMonth).map(([month, events]) => {
    const ACCIDENTAL = events.find(event => event.fragmentationType === 'Accidental')?.count || 0;
    const AERODYNAMICS = events.find(event => event.fragmentationType === 'Aerodynamics')?.count || 0;
    const ANOMALOUS = events.find(event => event.fragmentationType === 'Anomalous')?.count || 0;
    const COLLISION = events.find(event => event.fragmentationType === 'Collision')?.count || 0;
    const DELIBERATE = events.find(event => event.fragmentationType === 'Deliberate')?.count || 0;
    const ELECTRICAL = events.find(event => event.fragmentationType === 'Electrical')?.count || 0;
    const EXPLOSION = events.find(event => event.fragmentationType === 'Explosion')?.count || 0;
    const PROPULSION = events.find(event => event.fragmentationType === 'Propulsion')?.count || 0;
    const SMALL_IMPACTOR = events.find(event => event.fragmentationType === 'Small Impactor')?.count || 0;
    const UNKNOWN = events.find(event => event.fragmentationType === 'Unknown')?.count || 0;

    return {
      month: dayjs(month).format('MM/YYYY'),
      ACCIDENTAL,
      AERODYNAMICS,
      ANOMALOUS,
      COLLISION,
      DELIBERATE,
      ELECTRICAL,
      EXPLOSION,
      PROPULSION,
      SMALL_IMPACTOR,
      UNKNOWN,
    };
  });

  return groupedData;
}
