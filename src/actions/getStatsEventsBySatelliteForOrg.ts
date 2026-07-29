'use server';

import type { TypeGetStatsEventsBySatelliteAggregatedParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs, FORMAT_API_DATE } from '@/libs/Dayjs';

import type { EventsBySatelliteType } from './getStatsEventsBySatellite';

export async function getStatsEventsBySatelliteForOrg(
  organizationId: string,
  months?: number,
): Promise<EventsBySatelliteType[]> {
  try {
    const params: TypeGetStatsEventsBySatelliteAggregatedParams = {
      organization_id: organizationId,
    };

    if (months && months > 0) {
      params.start_date = dayjs().subtract(months, 'month').format(FORMAT_API_DATE);
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
  } catch (error) {
    console.error(error);
    throw error;
  }
}
