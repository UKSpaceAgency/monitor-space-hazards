'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import type { TypeExternalDataPerformanceAggregateOut, TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
import { dayjs, FORMAT_DATE } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { brandColors, chartPalette } from '../base/theme';

type ObjectDataIngestsProps = {
  initialData: TypeExternalDataPerformanceAggregateOut[];
  params: TypeGetExternalDataPerformanceAggregatedParams;
};

export function ObjectDataIngests({ initialData, params }: ObjectDataIngestsProps) {
  const t = useTranslations('Charts.Object_data_ingests');

  const [showDays, setShowDays] = useState<number>(8);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['external-data-performance-aggregated'],
    queryFn: () => getExternalDataPerformanceAggregated({
      ...params,
      max_age_days: showDays,
    }),
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, showDays]);

  const objectChartData = data.filter(item => item.sourceType === 'Satellite');
  const esaDiscosData = objectChartData.filter(item => item.sourceProvider === 'ESADiscos');
  const spaceTrackData = objectChartData.filter(item => item.sourceProvider === 'SpaceTrack');

  const datasets = {
    datasets: [
      {
        label: t('space_track'),
        data: spaceTrackData.map(data => ({
          x: data.ingestionDate as any,
          y: data.ingestionSum as number,
        })),
        borderColor: brandColors.SpaceTrack,
        backgroundColor: brandColors.SpaceTrack,
      },
      {
        label: t('esa_discos'),
        data: esaDiscosData.map(data => ({
          x: data.ingestionDate as any,
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
          value: 8,
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
        {(objectChartData[0]?.ingestionDate && !isFetching)
          ? dayjs(objectChartData[0].ingestionDate).format(FORMAT_DATE)
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
