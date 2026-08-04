import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import BaseBar from '../base-bar/BaseBar';

export type ActivityFlagsByReasonDatum = {
  reason: string;
  count: number;
  color: string;
};

export type ActivityFlagsByReasonChartProps = {
  actionButtons: ReactNode;
  data: ActivityFlagsByReasonDatum[];
};

export function ActivityFlagsByReasonChart({
  actionButtons,
  data,
}: ActivityFlagsByReasonChartProps) {
  const t = useTranslations('Charts.Activity_flags_by_reason');

  const datasets = {
    labels: data.map(({ reason }) => reason),
    datasets: [
      {
        label: t('flags'),
        data: data.map(({ count }) => count),
        backgroundColor: data.map(({ color }) => color),
        borderColor: data.map(({ color }) => color),
      },
    ],
  };

  return (
    <BaseBar
      data={datasets}
      actionButtons={actionButtons}
      stacked={false}
      showTotal={false}
      ariaLabel="Activity flags by reason for flag"
      yAxisTitle={t('y_axis_title')}
      xAxisTitle={t('x_axis_title')}
    />
  );
}

export default ActivityFlagsByReasonChart;
