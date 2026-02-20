import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TypeStatisticsEventsType } from '@/__generated__/data-contracts';

import { chartColors } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type ConjunctionEventsTypeChartProps = {
  data: TypeStatisticsEventsType[];
  actionButtons: ReactNode;
};

export function ConjunctionEventsTypeChart({ data, actionButtons }: ConjunctionEventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const filteredData = [...data].filter(({ event_type }) => event_type !== t('total_events'));

  const datasets = {
    labels: filteredData.map(({ event_type }) => event_type),
    datasets: [
      {
        data: filteredData.map(({ count }) => count),
        backgroundColor: chartColors,
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('event_type') }} ariaLabel="Conjunctions events by type" />;
}

export default ConjunctionEventsTypeChart;
