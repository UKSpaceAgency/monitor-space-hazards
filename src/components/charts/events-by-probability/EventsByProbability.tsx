import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { StatsMonthlyConjunctionEvent } from '@/actions/getStatsMonthlyConjunctionEvents';

import { chartPalette } from '../base/theme';
import BaseBar from '../base-bar/BaseBar';

export type EventsByProbabilityOfCollisionChartProps = {
  actionButtons: ReactNode;
  data: StatsMonthlyConjunctionEvent[];
};

export function EventsByProbabilityOfCollisionChart({
  actionButtons,
  data,
}: EventsByProbabilityOfCollisionChartProps) {
  const t = useTranslations('Charts.Events_by_probability_of_collision');

  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('low'),
        data: data.map(({ low }) => low ?? 0),
        borderColor: chartPalette.brightBlue,
        backgroundColor: chartPalette.brightBlue,
      },
      {
        label: t('medium'),
        data: data.map(({ medium }) => medium ?? 0),
        borderColor: chartPalette.midBlue,
        backgroundColor: chartPalette.midBlue,
      },
      {
        label: t('high'),
        data: data.map(({ high }) => high ?? 0),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
    ],
  };

  return (
    <BaseBar
      data={datasets}
      actionButtons={actionButtons}
      showTotal={false}
      showLegend
      yAxisTitle={t('y_axis_title')}
      legend={{ title: t('legend_title') }}
    />
  );
}

export default EventsByProbabilityOfCollisionChart;
