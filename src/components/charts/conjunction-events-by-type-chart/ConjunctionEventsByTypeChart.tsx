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
    labels: [
      t('debris'),
      t('another_satellite'),
      t('uk_satellites'),
      t('other'),
    ],
    datasets: [
      {
        data: [
          totals.debris,
          totals.anotherSatellite,
          totals.ukSatellites,
          totals.other,
        ],
        backgroundColor: [
          chartPalette.nspocBlue,
          chartPalette.nspocRed,
          chartPalette.nspocYellow,
          chartPalette.nspocGreen,
        ],
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
      stacked={false}
    />
  );
}

export default ConjunctionEventsByTypeChart;
