import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyConjunctionEventsByObjectType } from '@/actions/getStatsMonthlyConjunctionEventsByObjectType';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { conjunctionEventsByTypeMonthlyColumns } from './data-table/MonitoringConjunctionEventsByTypeMonthlyDataTableColumns';

const MonitoringConjunctionEventsByTypeMonthly = async () => {
  const t = await getTranslations('Charts.Monthly_conjunction_events');
  const data = await getStatsMonthlyConjunctionEventsByObjectType();
  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('debris'),
        data: data.map(({ DEBRIS }) => DEBRIS),
        borderColor: chartPalette.nspocBlue,
        backgroundColor: chartPalette.nspocBlue,
      },
      {
        label: t('satellite'),
        data: data.map(({ ANOTHER_SATELLITE }) => ANOTHER_SATELLITE),
        borderColor: chartPalette.nspocRed,
        backgroundColor: chartPalette.nspocRed,
      },
      {
        label: t('rocket_body'),
        data: data.map(({ WITH_UK_SATELLITES }) => WITH_UK_SATELLITES),
        borderColor: chartPalette.nspocYellow,
        backgroundColor: chartPalette.nspocYellow,
      },
      {
        label: t('other'),
        data: data.map(({ OTHER }) => OTHER),
        borderColor: chartPalette.nspocGreen,
        backgroundColor: chartPalette.nspocGreen,
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
        name="conjunction-events-by-type-monthly"
      />
      <Scrollable>
        <DataTable
          columns={conjunctionEventsByTypeMonthlyColumns}
          data={data.reverse()}
          ariaLabel="Information on Conjunction Events by type Monthly"
        />
      </Scrollable>
    </>
  );
};

export { MonitoringConjunctionEventsByTypeMonthly };
