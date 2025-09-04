import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyConjunctionEventsByObjectType } from '@/actions/getStatsMonthlyConjunctionEventsByObjectType';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { eventsByTypeMonthlyColumns } from './data-table/MonitoringEventsByTypeMonthlyDataTableColumns';

const MonitoringEventsByTypeMonthly = async () => {
  const t = await getTranslations('Charts.Monthly_conjunction_events');
  const data = await getStatsMonthlyConjunctionEventsByObjectType();
  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('debris'),
        data: data.map(({ DEBRIS }) => DEBRIS),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
      {
        label: t('satellite'),
        data: data.map(({ ANOTHER_SATELLITE }) => ANOTHER_SATELLITE),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
      {
        label: t('rocket_body'),
        data: data.map(({ WITH_UK_SATELLITES }) => WITH_UK_SATELLITES),
        borderColor: chartPalette.darkPink,
        backgroundColor: chartPalette.darkPink,
      },
      {
        label: t('other'),
        data: data.map(({ OTHER }) => OTHER),
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
        ariaLabel="Conjunction events by type monthly"
        yAxisTitle={t('y_axis_title')}
        xAxisTitle={t('x_axis_title')}
        legend={t('legend_title')}
      />
      <Scrollable>
        <DataTable
          columns={eventsByTypeMonthlyColumns}
          data={data.reverse()}
          ariaLabel="Information on Conjunction Events by type Monthly"
        />
      </Scrollable>
    </>
  );
};

export { MonitoringEventsByTypeMonthly };
