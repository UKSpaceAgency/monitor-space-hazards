'use server';

import type { TypeExternalDataProvider, TypeExternalDataType, TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';

import { getExternalDataPerformanceAggregated } from './getExternalDataPerformanceAggregated';

export type AnalysisAndManoeuvreSupportStatsType = {
  sourceType: TypeExternalDataType;
  sourceProvider: TypeExternalDataProvider;
  date: string;
  analysesCount: number;
  manoeuvreSupportCount: number;
};

export async function getStatsAnalysisAndManoeuvreSupport(query?: TypeGetExternalDataPerformanceAggregatedParams) {
  const data = await getExternalDataPerformanceAggregated(query);

  const filteredData = data.filter(item => item.sourceType === 'Analysis' || item.sourceType === 'Manoeuvre Trade Space Plot');

  const groupedData = filteredData.reduce((acc, item) => {
    const { sourceType, sourceProvider, ingestionDate, ingestionSum } = item;

    const key = ingestionDate;

    if (!acc[key]) {
      acc[key] = {
        sourceType: sourceType as TypeExternalDataType,
        sourceProvider: sourceProvider as TypeExternalDataProvider,
        date: ingestionDate,
        analysesCount: 0,
        manoeuvreSupportCount: 0,
      };
    }

    if (sourceType === 'Analysis') {
      acc[key].analysesCount = ingestionSum || 0;
    } else if (sourceType === 'Manoeuvre Trade Space Plot') {
      acc[key].manoeuvreSupportCount = ingestionSum || 0;
    }

    return acc;
  }, {} as { [key: string]: AnalysisAndManoeuvreSupportStatsType });

  return Object.values(groupedData);
};
