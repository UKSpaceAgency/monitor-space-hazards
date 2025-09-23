import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TypeStatisticsReentryEventsAndAlertsCount } from '@/__generated__/data-contracts';

import { chartPalette } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type ReentryEventsTypeChartProps = {
  data: TypeStatisticsReentryEventsAndAlertsCount[];
  actionButtons: ReactNode;
};

export function ReentryEventsTypeChart({ data, actionButtons }: ReentryEventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const order = ['Payload', 'Debris', 'Rocket Body', 'Unknown'];
  const filteredData = [...data]
    .filter(({ objectType }) => objectType !== 'Total')
    .sort((a, b) => order.indexOf(a.objectType) - order.indexOf(b.objectType));

  const datasets = {
    labels: filteredData.map(({ objectType }) => objectType),
    datasets: [
      {
        data: filteredData.map(({ count }) => count),
        backgroundColor: [chartPalette.darkBlue, chartPalette.darkPink, chartPalette.orange, chartPalette.lightPurple],
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('object_type') }} ariaLabel="Reentry events by type" />;
}

export default ReentryEventsTypeChart;
