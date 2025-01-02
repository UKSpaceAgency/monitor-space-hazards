import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { EventsByOrganizationType } from '@/actions/getStatsEventsByOrganization';

import { chartPalette } from '../base/theme';
import BaseBar from '../base-bar/BaseBar';

export type EventsByOrganizationChartProps = {
  actionButtons: ReactNode;
  data: EventsByOrganizationType[];
};

export function EventsByOrganizationChart({
  actionButtons,
  data,
}: EventsByOrganizationChartProps) {
  const t = useTranslations('Charts.Events_by_organisation');

  const isSingle = data.length === 1;

  const datasets = isSingle
    ? {
        labels: ['<1e-5', '<1e-3 and >1e-5', '>1e-3'],
        datasets: [
          {
            data:
              data.length > 0
                ? [data[0]?.low ?? 0, data[0]?.medium ?? 0, data[0]?.high ?? 0]
                : [],
            backgroundColor: [chartPalette.darkBlue, chartPalette.midBlue, chartPalette.brightBlue],
            borderWidth: 0,
          },
        ],
      }
    : {
        labels: data.map(({ name }) => name),
        datasets: [
          {
            label: t('<1e-5'),
            data: data.map(({ low }) => low ?? 0),
            borderColor: chartPalette.darkBlue,
            backgroundColor: chartPalette.darkBlue,
          },
          {
            label: t('<1e-3_and_>1e-5'),
            data: data.map(({ medium }) => medium ?? 0),
            borderColor: chartPalette.midBlue,
            backgroundColor: chartPalette.midBlue,
          },
          {
            label: t('>1e-3'),
            data: data.map(({ high }) => high ?? 0),
            borderColor: chartPalette.brightBlue,
            backgroundColor: chartPalette.brightBlue,
          },
        ],
      };

  const title
    = isSingle && data.length > 0
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
      title={title}
      data={datasets}
      actionButtons={actionButtons}
      showTotal={!isSingle}
      showLegend={!isSingle}
      legend={{ title: t('legend_title') }}
    />
  );
}

export default EventsByOrganizationChart;
