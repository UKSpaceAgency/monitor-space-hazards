'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { type AnalysisAndManoeuvreSupportStatsParams, type AnalysisAndManoeuvreSupportStatsType, getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';

import { AnalysisAndManoeuvreSupportChart } from '../charts/analysis-and-manoeuvre-support/AnalysisAndManoeuvreSupportChart';
import { PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable } from './data-table/PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable';

type PerformanceMonitoringUksaConjunctionEventContentProps = {
  params: AnalysisAndManoeuvreSupportStatsParams;
  data: AnalysisAndManoeuvreSupportStatsType[];
};

const PerformanceMonitoringUksaConjunctionEventContent = ({ data, params }: PerformanceMonitoringUksaConjunctionEventContentProps) => {
  const t = useTranslations('Performance_monitoring.performance_accordion.uksa');

  const [startDate, setStartDate] = useState<string>(params.start_date ?? '');

  const fetchParams = {
    ...params,
    start_date: startDate,
  };

  const { data: fetchedData, isFetching, refetch } = useQuery({
    queryKey: ['stats-analysis-and-manoeuvre-support'],
    queryFn: () => getStatsAnalysisAndManoeuvreSupport(fetchParams),
    initialData: data,
    refetchOnMount: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, startDate]);

  if (isFetching) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <AnalysisAndManoeuvreSupportChart data={fetchedData} setStartDate={setStartDate} startDate={startDate} />
      <PerformanceMonitoringAnalysisAndManoeuvreSupportDataTable data={fetchedData} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringUksaConjunctionEventContent };
