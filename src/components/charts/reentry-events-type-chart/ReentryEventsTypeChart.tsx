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

  const datasets = {
    labels: data.map(({ objectType }) => objectType),
    datasets: [
      {
        data: data.map(({ count }) => count),
        backgroundColor: [chartPalette.nspocBlue, chartPalette.nspocRed, chartPalette.nspocYellow, chartPalette.lightPurple],
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('object_type') }} ariaLabel="Reentry events by type" />;
}

export default ReentryEventsTypeChart;
