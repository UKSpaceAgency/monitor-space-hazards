'use server';

import type { TypeGetStatsMonthlyManoeuvrePlotsParams } from '@/__generated__/data-contracts';

import { getStatsMonthlyAnalyses } from './getStatsMonthlyAnalyses';
import { getStatsMonthlyManoeuvrePlots } from './getStatsMonthlyManoeuvrePlots';

export type AnalysisAndManoeuvreSupportStatsType = {
  month: string;
  analysesCount: number;
  manoeuvreSupportCount: number;
};

export type AnalysisAndManoeuvreSupportStatsParams = TypeGetStatsMonthlyManoeuvrePlotsParams;

export async function getStatsAnalysisAndManoeuvreSupport(query?: TypeGetStatsMonthlyManoeuvrePlotsParams) {
  const monthlyAnalyses = await getStatsMonthlyAnalyses(query);
  const monthlyManoeuvrePlots = await getStatsMonthlyManoeuvrePlots(query);

  const data: AnalysisAndManoeuvreSupportStatsType[] = monthlyAnalyses.map((analyse) => {
    const manoeuvrePlot = monthlyManoeuvrePlots.find(plot => plot.month === analyse.month);

    return {
      ...analyse,
      source: 'UKSA',
      analysesCount: analyse.count,
      manoeuvreSupportCount: manoeuvrePlot?.count || 0,
    };
  });

  return data;
};
