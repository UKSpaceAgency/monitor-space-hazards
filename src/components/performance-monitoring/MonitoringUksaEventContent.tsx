'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import Spinner from '@/ui/spinner/spinner';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { AnalysisAndManoeuvreSupportChart } from '../charts/analysis-and-manoeuvre-support/AnalysisAndManoeuvreSupportChart';
import { MonitoringAnalysisAndManoeuvreSupportDataTable } from './data-table/MonitoringAnalysisAndManoeuvreSupportDataTable';

const MonitoringUksaEventContent = () => {
  const t = useTranslations('Charts.Analysis_and_manoeuvre_support');

  const params: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    sort_order: 'desc',
    max_age_days: 7,
  };

  const [showDays, setShowDays] = useState(params.max_age_days ?? 7);

  const fetchParams: TypeGetExternalDataPerformanceAggregatedParams = {
    ...params,
    max_age_days: showDays,
  };

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.StatsAnalysisAndManoeuvreSupport, showDays],
    queryFn: () => getStatsAnalysisAndManoeuvreSupport(fetchParams),
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

  if (isFetching || !data) {
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <AnalysisAndManoeuvreSupportChart data={data} actionButtons={actionButtons} />
      <MonitoringAnalysisAndManoeuvreSupportDataTable data={data} params={params} />
    </div>
  );
};

export { MonitoringUksaEventContent };
