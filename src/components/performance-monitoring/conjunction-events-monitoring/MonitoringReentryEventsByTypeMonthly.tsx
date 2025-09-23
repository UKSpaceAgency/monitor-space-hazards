import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyReentryEventsByObjectType } from '@/actions/getStatsMonthlyReentryEventsByObjectType';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { reentryEventsByTypeMonthlyColumns } from './data-table/MonitoringReentryEventsByTypeMonthlyDataTableColumns';

const MonitoringReentryEventsByTypeMonthly = async () => {
  const t = await getTranslations('Charts.Monthly_conjunction_events');
  const data = await getStatsMonthlyReentryEventsByObjectType();
  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: 'Payload',
        data: data.map(({ PAYLOAD }) => PAYLOAD),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
      {
        label: 'Debris',
        data: data.map(({ DEBRIS }) => DEBRIS),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
      {
        label: 'Rocket Body',
        data: data.map(({ ROCKET_BODY }) => ROCKET_BODY),
        borderColor: chartPalette.darkPink,
        backgroundColor: chartPalette.darkPink,
      },
      {
        label: 'Unknown',
        data: data.map(({ UNKNOWN }) => UNKNOWN),
        borderColor: chartPalette.turquoise,
        backgroundColor: chartPalette.turquoise,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart
        data={datasets}
        stacked
        ariaLabel="Reentry events by type monthly"
        yAxisTitle={t('y_axis_title')}
        xAxisTitle={t('x_axis_title')}
        legend={t('object_type')}
      />
      <Scrollable>
        <DataTable
          columns={reentryEventsByTypeMonthlyColumns}
          data={data.reverse()}
          ariaLabel="Information on Reentry Events by type Monthly"
        />
      </Scrollable>
    </>
  );
};

export { MonitoringReentryEventsByTypeMonthly };
