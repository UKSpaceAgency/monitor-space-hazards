'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Spinner from '@/ui/spinner/spinner';

import { AnalysisAndManoeuvreSupportChart } from '../charts/analysis-and-manoeuvre-support/AnalysisAndManoeuvreSupportChart';
import { PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable } from './data-table/PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable';

type PerformanceMonitoringUksaConjunctionEventContentProps = {
  params: TypeGetExternalDataPerformanceAggregatedParams;
  data: AnalysisAndManoeuvreSupportStatsType[];
};

const PerformanceMonitoringUksaConjunctionEventContent = ({ data, params }: PerformanceMonitoringUksaConjunctionEventContentProps) => {
  const [showDays, setShowDays] = useState<number>(params.max_age_days ?? 7);

  const fetchParams: TypeGetExternalDataPerformanceAggregatedParams = {
    ...params,
    max_age_days: showDays,
  };

  const { data: fetchedData, isFetching, refetch } = useQuery({
    queryKey: ['stats-analysis-and-manoeuvre-support'],
    queryFn: () => getStatsAnalysisAndManoeuvreSupport(fetchParams),
    initialData: data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, showDays]);

  if (isFetching) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <AnalysisAndManoeuvreSupportChart data={fetchedData} setShowDays={setShowDays} showDays={showDays} />
      <PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable data={fetchedData} params={params} />
    </div>
  );
};

export { PerformanceMonitoringUksaConjunctionEventContent };
