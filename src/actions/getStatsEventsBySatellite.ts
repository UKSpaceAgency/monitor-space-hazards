'use server';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

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
      acc[key] = { name: commonName, id: noradId, organizationName, low: 0, medium: 0, high: 0 };
    }

    switch (collisionProbabilityRange) {
      case '< 1e-5':
        acc[key].low = events;
        break;
      case '1e-3 .. 1e-5':
        acc[key].medium = events;
        break;
      case '> 1e-3':
        acc[key].high = events;
        break;
    }

    return acc;
  }, {} as { [key: string]: EventsBySatelliteType });

  return Object.values(groupedData);
};
