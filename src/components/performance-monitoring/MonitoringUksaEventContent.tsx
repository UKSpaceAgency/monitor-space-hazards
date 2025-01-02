'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { AnalysisAndManoeuvreSupportChart } from '../charts/analysis-and-manoeuvre-support/AnalysisAndManoeuvreSupportChart';
import { MonitoringAnalysisAndManoeuvreSupportDataTable } from './data-table/MonitoringAnalysisAndManoeuvreSupportDataTable';

type MonitoringUksaEventContentProps = {
  params: TypeGetExternalDataPerformanceAggregatedParams;
  data: AnalysisAndManoeuvreSupportStatsType[];
};

const MonitoringUksaEventContent = ({ data, params }: MonitoringUksaEventContentProps) => {
  const t = useTranslations('Charts.Analysis_and_manoeuvre_support');

  const [showDays, setShowDays] = useState(params.max_age_days ?? 7);

  const fetchParams: TypeGetExternalDataPerformanceAggregatedParams = {
    ...params,
    max_age_days: showDays,
  };

  const { data: fetchedData, isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.StatsAnalysisAndManoeuvreSupport],
    queryFn: () => getStatsAnalysisAndManoeuvreSupport(fetchParams),
    initialData: data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const actionButtons = useMemo(
    () => (
      <ToggleButtons
        name="analysis-ingest-days"
        items={[
          {
            title: t('7_days'),
            ariaLabel: '7d',
            value: 7,
          },
          {
            title: t('30_days'),
            ariaLabel: '30d',
            value: 30,
          },
          {
            title: t('all_time'),
            ariaLabel: 'All',
            value: 9999,
          },
        ]}
        active={showDays}
        setActive={setShowDays}
        title={t('date_range')}
      />
    ),
    [setShowDays, showDays, t],
  );

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
      <AnalysisAndManoeuvreSupportChart data={fetchedData} actionButtons={actionButtons} />
      <MonitoringAnalysisAndManoeuvreSupportDataTable data={fetchedData} params={params} />
    </div>
  );
};

export { MonitoringUksaEventContent };
