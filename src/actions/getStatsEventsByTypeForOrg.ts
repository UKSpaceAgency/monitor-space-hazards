'use server';

import dayjs from 'dayjs';

import type { TypeGetStatsEventsBySatelliteAndTypeAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { FORMAT_API_DATE } from '@/libs/Dayjs';

export type EventsBySatelliteAndType = {
  name: string;
  organization_name: string | null;
  debris: number;
  anotherSatellite: number;
  ukSatellites: number;
  other: number;
  total: number;
};

export async function getStatsEventsByTypeForOrg(
  organizationId: string,
  months?: number,
): Promise<EventsBySatelliteAndType[]> {
  const params: TypeGetStatsEventsBySatelliteAndTypeAggregatedParams = {
    organization_id: organizationId,
  };

  if (months && months > 0) {
    params.start_date = dayjs().subtract(months, 'month').format(FORMAT_API_DATE);
  }

  const { data } = await Api.getStatsEventsBySatelliteAndTypeAggregated(params);

  if (data.length === 0) {
    return [];
  }

  return data.map(item => ({
    name: item.satellite_common_name,
    organization_name: item.organization_name ?? null,
    debris: item['Events with debris'] ?? 0,
    anotherSatellite: item['Events with another satellite'] ?? 0,
    ukSatellites: item['Events with two UK-licensed satellites'] ?? 0,
    other: item['Events with other objects (unknown/rocket body)'] ?? 0,
    total: item['Total number of events'] ?? 0,
  }));
}
