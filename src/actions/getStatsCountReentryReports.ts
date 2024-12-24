'use server';

import type { TypeGetStatsCountReentryReportsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsCountReentryReports(query?: TypeGetStatsCountReentryReportsParams) {
  const { data } = await Api.getStatsCountReentryReports(query);
  return data;
};
