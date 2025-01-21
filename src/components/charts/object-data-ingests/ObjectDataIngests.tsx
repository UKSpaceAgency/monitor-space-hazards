'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import BaseChart from '../base/BaseChart';
import { brandColors, chartPalette } from '../base/theme';

export function ObjectDataIngests({ latestIngestDate }: { latestIngestDate: string }) {
  const t = useTranslations('Charts.Object_data_ingests');

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

  const objectChartData = (data || []).filter(item => item.sourceType === 'Satellite');
  const esaDiscosData = objectChartData.filter(item => item.sourceProvider === 'ESADiscos');
  const spaceTrackData = objectChartData.filter(item => item.sourceProvider === 'SpaceTrack');

  const datasets = {
    datasets: [
      {
        label: t('space_track'),
        data: spaceTrackData.map(data => ({
          x: data.ingestionDate as unknown as number,
          y: data.ingestionSum as number,
        })),
        borderColor: brandColors.SpaceTrack,
        backgroundColor: brandColors.SpaceTrack,
      },
      {
        label: t('esa_discos'),
        data: esaDiscosData.map(data => ({
          x: data.ingestionDate as unknown as number,
          y: data.ingestionSum as number,
        })),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
    ],
  };

  const actionButtons = (
    <ToggleButtons
      name="object-ingests-days"
      items={[
        {
          title: t('7_days'),
          ariaLabel: '7 days',
          value: 7,
        },
        {
          title: t('30_days'),
          ariaLabel: '30 days',
          value: 31,
        },
        {
          title: t('all_time'),
          ariaLabel: 'All time',
          value: 0,
        },
      ]}
      active={showDays}
      setActive={setShowDays}
      title="Date range"
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
        name="object-ingests-chart"
        yAxisTitle={t('number_of_objects')}
        data={datasets}
        actionButtons={actionButtons}
        isDay
        legend={{ title: t('object_ingests') }}
      />
    </div>
  );
}

export default ObjectDataIngests;
