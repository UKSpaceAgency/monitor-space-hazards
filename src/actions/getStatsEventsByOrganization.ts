'use server';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type EventsByOrganizationSectionType = {
  events: number;
  collision_probability_range: string;
};

export type EventsByOrganizationType = {
  name: string;
  id: string;
  total_events: number;
  low: number;
  medium: number;
  high: number;
};

export async function getStatsEventsByOrganization(query?: TypeGetStatsEventsByOrganizationParams): Promise<EventsByOrganizationType[]> {
  const { data } = await Api.getStatsEventsByOrganization(query);

  const groupedData = data.reduce((acc, item) => {
    const { name, id, events, collision_probability_range } = item;

    const key = id as string;

    if (!acc[key]) {
      acc[key] = { name, id: key, total_events: 0, low: 0, medium: 0, high: 0 };
    }

    switch (collision_probability_range) {
      case '< 1e-5':
        acc[key].low = events;
        acc[key].total_events += events;
        break;
      case '1e-3 .. 1e-5':
        acc[key].medium = events;
        acc[key].total_events += events;
        break;
      case '> 1e-3':
        acc[key].high = events;
        acc[key].total_events += events;
        break;
    }

    return acc;
  }, {} as { [key: string]: EventsByOrganizationType });

  return Object.values(groupedData);
};
