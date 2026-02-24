import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';

import type { TypeStatisticsFragmentationEventsCountByFragmentationType } from '@/__generated__/data-contracts';

import { chartPalette } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type FragmentationEventsTypeChartProps = {
  data: TypeStatisticsFragmentationEventsCountByFragmentationType[];
  actionButtons: ReactNode;
};

export function FragmentationEventsTypeChart({ data, actionButtons }: FragmentationEventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const datasets = useMemo(() => {
    const labels: string[] = [];
    const dataValues: number[] = [];
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];

    const ACCIDENTAL = data.find(({ fragmentation_type }) => fragmentation_type === 'Accidental')?.count || 0;
    const AERODYNAMICS = data.find(({ fragmentation_type }) => fragmentation_type === 'Aerodynamics')?.count || 0;
    const ANOMALOUS = data.find(({ fragmentation_type }) => fragmentation_type === 'Anomalous')?.count || 0;
    const COLLISION = data.find(({ fragmentation_type }) => fragmentation_type === 'Collision')?.count || 0;
    const DELIBERATE = data.find(({ fragmentation_type }) => fragmentation_type === 'Deliberate')?.count || 0;
    const ELECTRICAL = data.find(({ fragmentation_type }) => fragmentation_type === 'Electrical')?.count || 0;
    const EXPLOSION = data.find(({ fragmentation_type }) => fragmentation_type === 'Explosion')?.count || 0;
    const PROPULSION = data.find(({ fragmentation_type }) => fragmentation_type === 'Propulsion')?.count || 0;
    const SMALL_IMPACTOR = data.find(({ fragmentation_type }) => fragmentation_type === 'Small Impactor')?.count || 0;
    const UNKNOWN = data.find(({ fragmentation_type }) => fragmentation_type === 'Unknown')?.count || 0;

    if (EXPLOSION > 0) {
      labels.push('Explosion');
      dataValues.push(EXPLOSION);
      backgroundColors.push(chartPalette.nspocBlue);
      borderColors.push(chartPalette.nspocBlue);
    }
    if (COLLISION > 0) {
      labels.push('Collision');
      dataValues.push(COLLISION);
      backgroundColors.push(chartPalette.nspocRed);
      borderColors.push(chartPalette.nspocRed);
    }
    if (UNKNOWN > 0) {
      labels.push('Unknown');
      dataValues.push(UNKNOWN);
      backgroundColors.push(chartPalette.nspocYellow);
      borderColors.push(chartPalette.nspocYellow);
    }
    if (ACCIDENTAL > 0) {
      labels.push('Accidental');
      dataValues.push(ACCIDENTAL);
      backgroundColors.push(chartPalette.nspocGreen);
      borderColors.push(chartPalette.nspocGreen);
    }
    if (DELIBERATE > 0) {
      labels.push('Deliberate');
      dataValues.push(DELIBERATE);
      backgroundColors.push(chartPalette.rose);
      borderColors.push(chartPalette.rose);
    }
    if (PROPULSION > 0) {
      labels.push('Propulsion');
      dataValues.push(PROPULSION);
      backgroundColors.push(chartPalette.skin);
      borderColors.push(chartPalette.skin);
    }
    if (ELECTRICAL > 0) {
      labels.push('Electrical');
      dataValues.push(ELECTRICAL);
      backgroundColors.push(chartPalette.black);
      borderColors.push(chartPalette.black);
    }
    if (ANOMALOUS > 0) {
      labels.push('Anomalous');
      dataValues.push(ANOMALOUS);
      backgroundColors.push(chartPalette.gray2);
      borderColors.push(chartPalette.gray2);
    }
    if (SMALL_IMPACTOR > 0) {
      labels.push('Small Impactor');
      dataValues.push(SMALL_IMPACTOR);
      backgroundColors.push(chartPalette.midGrey);
      borderColors.push(chartPalette.midGrey);
    }
    if (AERODYNAMICS > 0) {
      labels.push('Aerodynamics');
      dataValues.push(AERODYNAMICS);
      backgroundColors.push(chartPalette.lightGrey);
      borderColors.push(chartPalette.lightGrey);
    }

    return {
      labels,
      datasets: [{
        label: 'Fragmentation Events',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
      }],
    };
  }, [data]);

  return <BasePie data={datasets} actionButtons={actionButtons} legend={{ title: t('fragmentation_type') }} ariaLabel="Fragmentation events by type" />;
}

export default FragmentationEventsTypeChart;
