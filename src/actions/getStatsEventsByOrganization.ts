'use server';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsEventsByOrganization(query?: TypeGetStatsEventsByOrganizationParams) {
  const { data } = await Api.getStatsEventsByOrganization(query);
  return data;
};
