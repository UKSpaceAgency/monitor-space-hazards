'use server';

import Api from '@/libs/Api';

import type { EventsBySatelliteType } from './getStatsEventsBySatellite';

export async function getStatsEventsBySatelliteForOrg(
  organizationId: string,
): Promise<EventsBySatelliteType[]> {
  const { data } = await Api.getStatsEventsBySatelliteAggregated({
    organization_id: organizationId,
  });

  if (data.length === 0) {
    return [];
  }

  return data.map(item => ({
    name: item.satellite_common_name,
    organization_name: item.organization_name,
    low: item['< 1e-5'] ?? 0,
    medium: item['1e-3 .. 1e-5'] ?? 0,
    high: item['> 1e-3'] ?? 0,
  }));
}
