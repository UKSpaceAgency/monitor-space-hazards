'use client';

import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseBar from '../base-bar/BaseBar';

type MonthlyAnalysesProps = {
  data: ChartData<'bar'>;
  yAxisTitle?: string;
  xAxisTitle?: string;
  stacked?: boolean;
  legend?: string;
  ariaLabel?: string;
  name: string;
};

const MonthlyBarChart = ({ data, yAxisTitle, xAxisTitle, stacked = false, legend, ariaLabel, name }: MonthlyAnalysesProps) => {
  const t = useTranslations('Charts.Actions');
  const [showMonths, setShowMonths] = useState(12);

  const actionButtons = (
    <ToggleButtons
      name={name}
      ariaLabel={ariaLabel}
      items={[
        {
          id: '12_months',
          title: t('last_12_months'),
          ariaLabel: t('last_12_months'),
          value: 12,
        },
        {
          id: 'all_time',
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
      labels: data.labels?.slice(-showMonths),
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
      xAxisTitle={xAxisTitle}
      data={datasets}
      stacked={stacked}
      showLegend
      ariaLabel={ariaLabel}
      legend={{
        title: legend,
      }}
    />
  );
};

export { MonthlyBarChart };
