'use server';

import type { TypeGetStatsMonthlyAnalysesParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getStatsMonthlyAnalyses(query?: TypeGetStatsMonthlyAnalysesParams) {
  const { data } = await Api.getStatsMonthlyAnalyses(query);
  return data;
};
