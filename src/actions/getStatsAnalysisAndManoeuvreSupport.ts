'use server';

import type { TypeExternalDataProvider, TypeExternalDataType, TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';

import { getExternalDataPerformanceAggregated } from './getExternalDataPerformanceAggregated';

export type AnalysisAndManoeuvreSupportStatsType = {
  source_type: TypeExternalDataType;
  source_provider: TypeExternalDataProvider;
  date: string;
  analyses_count: number;
  manoeuvre_support_count: number;
};

export async function getStatsAnalysisAndManoeuvreSupport(query?: TypeGetExternalDataPerformanceAggregatedParams) {
  const data = await getExternalDataPerformanceAggregated(query);

  const filteredData = data.filter(item => item.source_type === 'Analysis' || item.source_type === 'Manoeuvre Trade Space Plot');

  const groupedData = filteredData.reduce((acc, item) => {
    const { source_type, source_provider, ingestion_date, ingestion_sum } = item;

    const key = ingestion_date;

    if (!acc[key]) {
      acc[key] = {
        source_type: source_type as TypeExternalDataType,
        source_provider: source_provider as TypeExternalDataProvider,
        date: ingestion_date,
        analyses_count: 0,
        manoeuvre_support_count: 0,
      };
    }

    switch (source_type) {
      case 'Analysis':
        acc[key].analyses_count = ingestion_sum || 0;
        break;
      case 'Manoeuvre Trade Space Plot':
        acc[key].manoeuvre_support_count = ingestion_sum || 0;
        break;
    }

    return acc;
  }, {} as { [key: string]: AnalysisAndManoeuvreSupportStatsType });

  return Object.values(groupedData);
};
