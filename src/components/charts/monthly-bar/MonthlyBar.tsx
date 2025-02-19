'use client';

import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { dayjs } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseBar from '../base-bar/BaseBar';

type MonthlyAnalysesProps = {
  data: ChartData<'bar'>;
  yAxisTitle?: string;
  stacked?: boolean;
};

const MonthlyBarChart = ({ data, yAxisTitle, stacked = false }: MonthlyAnalysesProps) => {
  const t = useTranslations('Charts.Actions');
  const [showMonths, setShowMonths] = useState(12);

  const actionButtons = (
    <ToggleButtons
      name="organisations-and-users-data-range"
      items={[
        {
          title: t('12_months'),
          ariaLabel: t('12_months'),
          value: 12,
        },
        {
          title: t('all_time'),
          ariaLabel: t('all_time'),
          value: 0,
        },
      ]}
      active={showMonths}
      setActive={setShowMonths}
      title={t('data_range')}
    />
  );

  const datasets = useMemo(() => {
    return {
      labels: data.labels?.slice(-showMonths).map(label => dayjs(label as string).format('MM/YYYY')),
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(-showMonths),
      })),
    };
  }, [data, showMonths]);

  return (
    <BaseBar
      actionButtons={actionButtons}
      yAxisTitle={yAxisTitle}
      data={datasets}
      stacked={stacked}
      showLegend
    />
  );
};

export { MonthlyBarChart };
