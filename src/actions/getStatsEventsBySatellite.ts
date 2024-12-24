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
  less: EventsBySatelliteSectionType;
  between: EventsBySatelliteSectionType;
  more: EventsBySatelliteSectionType;
  organizationName: string;
};

export async function getStatsEventsBySatellite(query?: TypeGetStatsEventsBySatelliteParams): Promise<EventsBySatelliteType[]> {
  const { data } = await Api.getStatsEventsBySatellite(query);

  const groupedData = data.reduce((acc, item) => {
    const { commonName, noradId, events, collisionProbabilityRange, organizationName } = item;

    const key = noradId;

    if (!acc[key]) {
      acc[key] = { commonName, noradId, organizationName, less: {}, between: {}, more: {} };
    }

    if (collisionProbabilityRange === '< 1e-5') {
      acc[key].less = { events, collisionProbabilityRange };
    } else if (collisionProbabilityRange === '1e-3 .. 1e-5') {
      acc[key].between = { events, collisionProbabilityRange };
    } else if (collisionProbabilityRange === '> 1e-3') {
      acc[key].more = { events, collisionProbabilityRange };
    }

    return acc;
  }, {} as { [key: string]: any });

  return Object.values(groupedData);
};
