import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TypeStatisticsFragmentationEventsCountByFragmentationType } from '@/__generated__/data-contracts';

import { chartColors } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type FragmentationEventsTypeChartProps = {
  data: TypeStatisticsFragmentationEventsCountByFragmentationType[];
  actionButtons: ReactNode;
};

export function FragmentationEventsTypeChart({ data, actionButtons }: FragmentationEventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const filteredData = [...data].filter(({ fragmentationType }) => fragmentationType !== 'Total');

  const datasets = {
    labels: filteredData.map(({ fragmentationType }) => fragmentationType),
    datasets: [
      {
        data: filteredData.map(({ count }) => count),
        backgroundColor: chartColors,
      },
    ],
  };

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('fragmentation_type') }} ariaLabel="Fragmentation events by type" />;
}

export default FragmentationEventsTypeChart;
