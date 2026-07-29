import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { EventsBySatelliteAndType } from '@/actions/getStatsEventsByTypeForOrg';

import { chartPalette } from '../base/theme';
import BaseBar from '../base-bar/BaseBar';

export type ConjunctionEventsByTypeChartProps = {
  actionButtons?: ReactNode;
  data: EventsBySatelliteAndType[];
};

export function ConjunctionEventsByTypeChart({
  actionButtons,
  data,
}: ConjunctionEventsByTypeChartProps) {
  const t = useTranslations('Charts.Conjunction_events_by_type');

  const totals = data.reduce(
    (acc, item) => ({
      debris: acc.debris + item.debris,
      anotherSatellite: acc.anotherSatellite + item.anotherSatellite,
      ukSatellites: acc.ukSatellites + item.ukSatellites,
      other: acc.other + item.other,
    }),
    { debris: 0, anotherSatellite: 0, ukSatellites: 0, other: 0 },
  );

  const datasets = {
    labels: [''],
    datasets: [
      {
        label: t('debris'),
        data: [totals.debris],
        borderColor: chartPalette.nspocBlue,
        backgroundColor: chartPalette.nspocBlue,
        borderWidth: 0,
      },
      {
        label: t('another_satellite'),
        data: [totals.anotherSatellite],
        borderColor: chartPalette.nspocRed,
        backgroundColor: chartPalette.nspocRed,
        borderWidth: 0,
      },
      {
        label: t('uk_satellites'),
        data: [totals.ukSatellites],
        borderColor: chartPalette.nspocYellow,
        backgroundColor: chartPalette.nspocYellow,
        borderWidth: 0,
      },
      {
        label: t('other'),
        data: [totals.other],
        borderColor: chartPalette.nspocGreen,
        backgroundColor: chartPalette.nspocGreen,
        borderWidth: 0,
      },
    ],
  };

  const title
    = data.length === 1
      ? (
          <p className="govuk-body govuk-!-text-align-centre">
            {t('events_involving')}
            {' '}
            <b>{data[0]?.name}</b>
          </p>
        )
      : null;

  return (
    <BaseBar
      yAxisTitle={t('y_axis')}
      xAxisTitle={t('x_axis')}
      title={title}
      data={datasets}
      ariaLabel="Conjunction events by type"
      actionButtons={actionButtons}
      showLegend
      legend={{ title: t('legend_title') }}
      stacked={false}
    />
  );
}

export default ConjunctionEventsByTypeChart;
