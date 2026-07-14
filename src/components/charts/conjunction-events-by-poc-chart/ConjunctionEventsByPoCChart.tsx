import { useTranslations } from 'next-intl';

import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';

import { chartPalette } from '../base/theme';
import BaseBar from '../base-bar/BaseBar';

export type ConjunctionEventsByPoCChartProps = {
  data: EventsBySatelliteType[];
};

export function ConjunctionEventsByPoCChart({
  data,
}: ConjunctionEventsByPoCChartProps) {
  const t = useTranslations('Charts.Conjunction_events_by_poc');

  const totals = data.reduce(
    (acc, item) => ({
      low: acc.low + item.low,
      medium: acc.medium + item.medium,
      high: acc.high + item.high,
    }),
    { low: 0, medium: 0, high: 0 },
  );

  const datasets = {
    labels: [t('low'), t('medium'), t('high')],
    datasets: [
      {
        data: [totals.low, totals.medium, totals.high],
        backgroundColor: [chartPalette.nspocBlue, chartPalette.nspocRed, chartPalette.nspocYellow],
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
      xAxisTitle={t('x_axis_poc')}
      title={title}
      data={datasets}
      ariaLabel="Conjunction events by probability of collision"
      stacked={false}
    />
  );
}

export default ConjunctionEventsByPoCChart;
