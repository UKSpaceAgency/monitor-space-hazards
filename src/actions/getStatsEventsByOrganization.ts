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
  less: EventsByOrganizationSectionType;
  between: EventsByOrganizationSectionType;
  more: EventsByOrganizationSectionType;
};

export async function getStatsEventsByOrganization(query?: TypeGetStatsEventsByOrganizationParams): Promise<EventsByOrganizationType[]> {
  const { data } = await Api.getStatsEventsByOrganization(query);

  const groupedData = data.reduce((acc, item) => {
    const { name, id, events, collisionProbabilityRange } = item;

    const key = id as string;

    if (!acc[key]) {
      acc[key] = { name, id, totalEvents: 0, less: {}, between: {}, more: {} };
    }

    if (collisionProbabilityRange === '< 1e-5') {
      acc[key].less = { events, collisionProbabilityRange };
      acc[key].totalEvents += events;
    } else if (collisionProbabilityRange === '1e-3 .. 1e-5') {
      acc[key].between = { events, collisionProbabilityRange };
      acc[key].totalEvents += events;
    } else if (collisionProbabilityRange === '> 1e-3') {
      acc[key].more = { events, collisionProbabilityRange };
      acc[key].totalEvents += events;
    }

    return acc;
  }, {} as { [key: string]: any });

  return Object.values(groupedData);
};
