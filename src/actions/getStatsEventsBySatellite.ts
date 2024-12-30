'use server';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type EventsBySatelliteSectionType = {
  events: number;
  collisionProbabilityRange: string;
};

export type EventsBySatelliteType = {
  name: string;
  id: string;
  low: number;
  medium: number;
  high: number;
  organizationName: string;
};

export async function getStatsEventsBySatellite(query?: TypeGetStatsEventsBySatelliteParams): Promise<EventsBySatelliteType[]> {
  const { data } = await Api.getStatsEventsBySatellite(query);

  const groupedData = data.reduce((acc, item) => {
    const { commonName, noradId, events, collisionProbabilityRange, organizationName } = item;

    const key = noradId;

    if (!acc[key]) {
      acc[key] = { commonName, noradId, organizationName, low: {}, medium: {}, high: {} };
    }

    if (collisionProbabilityRange === '< 1e-5') {
      acc[key].low = events;
    } else if (collisionProbabilityRange === '1e-3 .. 1e-5') {
      acc[key].medium = events;
    } else if (collisionProbabilityRange === '> 1e-3') {
      acc[key].high = events;
    }

    return acc;
  }, {} as { [key: string]: any });

  return Object.values(groupedData);
};
