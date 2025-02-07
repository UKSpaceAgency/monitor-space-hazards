'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

export function CdmIngestsChart({ latestIngestDate }: { latestIngestDate: string }) {
  const t = useTranslations('Charts.Cdm_ingests');

  const params: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    max_age_days: 7,
    sort_order: 'desc',
  };

  const [showDays, setShowDays] = useState(params.max_age_days ?? 7);

  const { data, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.DataPerformanceAggregated, showDays],
    queryFn: () => getExternalDataPerformanceAggregated({
      ...params,
      max_age_days: showDays,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const cdmChartData = (data || []).filter(item => item.sourceType === 'CDM');

  const datasets = {
    datasets: [
      {
        label: t('space_track'),
        data: cdmChartData.map(data => ({
          x: data.ingestionDate as unknown as number,
          y: data.ingestionSum as number,
        })),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
    ],
  };

  const actionButtons = (
    <ToggleButtons
      name="cdm-ingests-days"
      items={[
        {
          title: '7d',
          ariaLabel: t('7_days'),
          value: 7,
        },
        {
          title: '30d',
          ariaLabel: t('30_days'),
          value: 31,
        },
        {
          title: 'All',
          ariaLabel: t('all_time'),
          value: 0,
        },
      ]}
      active={showDays}
      setActive={setShowDays}
      title={t('data_range')}
    />
  );

  return (
    <div className="mb-4">
      <p className="govuk-body-s">
        {t('latest_ingest')}
        {(latestIngestDate && !isFetching)
          ? latestIngestDate
          : 'loading...'}
      </p>
      <BaseChart
        name="cdm-ingests-chart"
        data={datasets}
        yAxisTitle={t('number_of_cdms')}
        actionButtons={actionButtons}
        legend={{ title: t('conjunction_data_message') }}
        isDay
      />
    </div>
  );
}

export default CdmIngestsChart;
