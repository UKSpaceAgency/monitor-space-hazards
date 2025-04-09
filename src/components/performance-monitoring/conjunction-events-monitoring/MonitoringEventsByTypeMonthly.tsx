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
        borderColor: chartPalette.lightPurple,
        backgroundColor: chartPalette.lightPurple,
      },
      {
        label: t('other'),
        data: data.map(({ OTHER }) => OTHER),
        borderColor: chartPalette.darkPink,
        backgroundColor: chartPalette.darkPink,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart data={datasets} stacked yAxisTitle={t('y_axis_title')} />
      <Scrollable>
        <DataTable
          columns={eventsByTypeMonthlyColumns}
          data={data.reverse()}
        />
      </Scrollable>
    </>
  );
};

export { MonitoringEventsByTypeMonthly };
