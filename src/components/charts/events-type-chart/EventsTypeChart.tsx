import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TypeStatisticsEventsType } from '@/__generated__/data-contracts';

import { chartColors } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type EventsTypeChartProps = {
  data: TypeStatisticsEventsType[];
  actionButtons: ReactNode;
};

export function EventsTypeChart({ data, actionButtons }: EventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const filteredData = [...data].filter(({ eventType }) => eventType !== t('total_events'));

  const datasets = {
    labels: filteredData.map(({ eventType }) => eventType),
    datasets: [
      {
        data: filteredData.map(({ count }) => count),
        backgroundColor: chartColors,
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('event_type') }} />;
}

export default EventsTypeChart;
