'use server';

import dayjs from 'dayjs';

import type { TypeGetStatsEventsBySatelliteAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { FORMAT_API_DATE } from '@/libs/Dayjs';

export type EventsBySatelliteType = {
  name: string;
  low: number;
  medium: number;
  high: number;
  organization_name: string;
};

export async function getStatsEventsBySatellite(query?: TypeGetStatsEventsBySatelliteAggregatedParams): Promise<EventsBySatelliteType[]> {
  const params: TypeGetStatsEventsBySatelliteAggregatedParams = {};

  if (query?.start_date) {
    params.start_date = dayjs(query.start_date).format(FORMAT_API_DATE);
  }
  if (query?.end_date) {
    params.end_date = dayjs(query.end_date).format(FORMAT_API_DATE);
  }
  const { data } = await Api.getStatsEventsBySatelliteAggregated(params);

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
};
