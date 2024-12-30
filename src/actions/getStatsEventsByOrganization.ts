'use server';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type EventsByOrganizationSectionType = {
  events: number;
  collisionProbabilityRange: string;
};

export type EventsByOrganizationType = {
  name: string;
  id: string;
  totalEvents: number;
  low: number;
  medium: number;
  high: number;
};

export async function getStatsEventsByOrganization(query?: TypeGetStatsEventsByOrganizationParams): Promise<EventsByOrganizationType[]> {
  const { data } = await Api.getStatsEventsByOrganization(query);

  const groupedData = data.reduce((acc, item) => {
    const { name, id, events, collisionProbabilityRange } = item;

    const key = id as string;

    if (!acc[key]) {
      acc[key] = { name, id, totalEvents: 0, low: {}, medium: {}, high: {} };
    }

    if (collisionProbabilityRange === '< 1e-5') {
      acc[key].low = events;
      acc[key].totalEvents += events;
    } else if (collisionProbabilityRange === '1e-3 .. 1e-5') {
      acc[key].medium = events;
      acc[key].totalEvents += events;
    } else if (collisionProbabilityRange === '> 1e-3') {
      acc[key].high = events;
      acc[key].totalEvents += events;
    }

    return acc;
  }, {} as { [key: string]: any });

  return Object.values(groupedData);
};
