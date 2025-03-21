'use client';

import { useQuery } from '@tanstack/react-query';
import { camelCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeExternalDataType, TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

type DataPerformanceChartProps = {
  latestIngestDate: string;
  sourceType: TypeExternalDataType;
  xAxisTitle: string;
  legend: string;
};

const DataPerformanceChart = ({ latestIngestDate, sourceType, xAxisTitle, legend }: DataPerformanceChartProps) => {
  const t = useTranslations('Charts.Ingests');

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

  const ingestsData = (data || []).filter(item => item.sourceType === sourceType);
  const esaDiscosData = ingestsData.filter(item => item.sourceProvider === 'ESADiscos');
  const spaceTrackData = ingestsData.filter(item => item.sourceProvider === 'SpaceTrack');

  const datasets = {
    datasets: [
      {
        label: t('space_track'),
        data: spaceTrackData.map(data => ({
          x: data.ingestionDate as unknown as number,
          y: data.ingestionSum as number,
        })),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
      ...(sourceType === 'Satellite'
        ? [
            {
              label: t('esa_discos'),
              data: esaDiscosData.map(data => ({
                x: data.ingestionDate as unknown as number,
                y: data.ingestionSum as number,
              })),
              borderColor: chartPalette.orange,
              backgroundColor: chartPalette.orange,
            },
          ]
        : []),
    ],
  };

  const actionButtons = (
    <ToggleButtons
      name={`${camelCase(sourceType)}-ingests-days`}
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
        name={`${camelCase(sourceType)}-ingests-chart`}
        data={datasets}
        yAxisTitle={xAxisTitle}
        actionButtons={actionButtons}
        legend={{ title: legend }}
        isDay
      />
    </div>
  );
};

export { DataPerformanceChart };
