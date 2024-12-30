import type { ReactNode } from 'react';

import type { TypeStatisticsEventsType } from '@/__generated__/data-contracts';

import { chartColors } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type EventsTypeChartProps = {
  data: TypeStatisticsEventsType[];
  actionButtons?: ReactNode;
};

export function EventsTypeChart({ data, actionButtons }: EventsTypeChartProps) {
  const filteredData = [...data].filter(({ eventType }) => eventType !== 'Total events across all organisations');

  const datasets = {
    labels: filteredData.map(({ eventType }) => eventType),
    datasets: [
      {
        data: filteredData.map(({ count }) => count),
        backgroundColor: chartColors,
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: 'Event type' }} />;
}

export default EventsTypeChart;
