import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';

import type { TypeStatisticsFragmentationEventsCountByFragmentationType } from '@/__generated__/data-contracts';

import { chartPalette } from '../base/theme';
import BasePie from '../base-pie/BasePie';

export type FragmentationEventsTypeChartProps = {
  data: TypeStatisticsFragmentationEventsCountByFragmentationType[];
  actionButtons: ReactNode;
};

// Colour code

// Explosion

// #007CC8

// Collision

// #C00000

// Unknown/Anomalous

// #FFC000

// Accidental

// #92D050

// Deliberate

// #FF0066

// Propulsion

// #F2AA84

// Electrical

// #0B0C0C

// Propulsion

// #505A5F

// Small Impactor

// #B1B4B6

// Aerodynamics

// #F3F2F1

export function FragmentationEventsTypeChart({ data, actionButtons }: FragmentationEventsTypeChartProps) {
  const t = useTranslations('Charts.Events_type');

  const datasets = useMemo(() => {
    const labels: string[] = [];
    const dataValues: number[] = [];
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];

    const ACCIDENTAL = data.find(({ fragmentationType }) => fragmentationType === 'Accidental')?.count || 0;
    const AERODYNAMICS = data.find(({ fragmentationType }) => fragmentationType === 'Aerodynamics')?.count || 0;
    const ANOMALOUS = data.find(({ fragmentationType }) => fragmentationType === 'Anomalous')?.count || 0;
    const COLLISION = data.find(({ fragmentationType }) => fragmentationType === 'Collision')?.count || 0;
    const DELIBERATE = data.find(({ fragmentationType }) => fragmentationType === 'Deliberate')?.count || 0;
    const ELECTRICAL = data.find(({ fragmentationType }) => fragmentationType === 'Electrical')?.count || 0;
    const EXPLOSION = data.find(({ fragmentationType }) => fragmentationType === 'Explosion')?.count || 0;
    const PROPULSION = data.find(({ fragmentationType }) => fragmentationType === 'Propulsion')?.count || 0;
    const SMALL_IMPACTOR = data.find(({ fragmentationType }) => fragmentationType === 'Small Impactor')?.count || 0;
    const UNKNOWN = data.find(({ fragmentationType }) => fragmentationType === 'Unknown')?.count || 0;

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
