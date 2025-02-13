'use server';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type StatsMonthlyAnalysesType = {
  month: string;
  analyses: number;
  manoeuvreSupportPlots: number;
};

export async function getStatsMonthlyAnalyses(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyAnalysesType[]> {
  const { data: analyses } = await Api.getStatsMonthlyAnalyses(query);
  const { data: manoeuvrePlots } = await Api.getStatsMonthlyManoeuvrePlots(query);

  const data = analyses.map((analysis, index) => ({
    month: analysis.month,
    analyses: analysis.count,
    manoeuvreSupportPlots: manoeuvrePlots?.[index]?.count ?? 0,
  }));

  return data;
}
