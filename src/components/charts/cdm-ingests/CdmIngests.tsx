'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import type { TypeExternalDataPerformanceAggregateOut, TypeGetExternalDataPerformanceAggregatedParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
import { dayjs, FORMAT_DATE } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

type CdmIngestsChartProps = {
  initialData: TypeExternalDataPerformanceAggregateOut[];
  params: TypeGetExternalDataPerformanceAggregatedParams;
};

export function CdmIngestsChart({ initialData, params }: CdmIngestsChartProps) {
  const t = useTranslations('Charts.CdmIngests');

  const [showDays, setShowDays] = useState<number>(8);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['external-data-performance-aggregated'],
    queryFn: () => getExternalDataPerformanceAggregated({
      ...params,
      max_age_days: showDays,
    }),
    initialData,
    refetchOnMount: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch, showDays]);

  const cdmChartData = data.filter(item => item.sourceType === 'CDM');

  const datasets = {
    datasets: [
      {
        label: t('space_track'),
        data: cdmChartData.map(data => ({
          x: data.ingestionDate as any,
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
          value: 8,
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
        {(cdmChartData[0]?.ingestionDate && !isFetching)
          ? dayjs(cdmChartData[0].ingestionDate).format(FORMAT_DATE)
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
