'use server';

import type { TypeGetStatsEventsByOrganizationAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';

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

export async function getStatsEventsByOrganization(query?: TypeGetStatsEventsByOrganizationAggregatedParams): Promise<EventsByOrganizationType[]> {
  const params: TypeGetStatsEventsByOrganizationAggregatedParams = {};
  if (query?.start_date) {
    params.start_date = dayjs(query.start_date).format(FORMAT_API_DATE);
  }
  if (query?.end_date) {
    params.end_date = dayjs(query.end_date).format(FORMAT_API_DATE);
  }
  const { data } = await Api.getStatsEventsByOrganizationAggregated(params);

  if (data.length === 0) {
    return [];
  }

  return data.map(item => ({
    name: item.organization_name,
    id: item.organization_id,
    total_events: item.total ?? 0,
    low: item['< 1e-5'] ?? 0,
    medium: item['1e-3 .. 1e-5'] ?? 0,
    high: item['> 1e-3'] ?? 0,
  }));
};
