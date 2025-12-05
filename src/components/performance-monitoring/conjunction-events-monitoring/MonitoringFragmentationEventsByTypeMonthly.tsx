import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyFragmentationEventsByObjectType } from '@/actions/getStatsMonthlyFragmentationEventsByObjectType';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { fragmentationEventsByTypeMonthlyColumns } from './data-table/MonitoringFragmentationEventsByTypeMonthlyDataTableColumns';

const MonitoringFragmentationEventsByTypeMonthly = async () => {
  const t = await getTranslations('Charts.Monthly_fragmentation_events');
  const data = await getStatsMonthlyFragmentationEventsByObjectType();

  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('accidental'),
        data: data.map(({ ACCIDENTAL }) => ACCIDENTAL),
        borderColor: chartPalette.nspocBlue,
        backgroundColor: chartPalette.nspocBlue,
      },
      {
        label: t('aerodynamics'),
        data: data.map(({ AERODYNAMICS }) => AERODYNAMICS),
        borderColor: chartPalette.nspocRed,
        backgroundColor: chartPalette.nspocRed,
      },
      {
        label: t('anomalous'),
        data: data.map(({ ANOMALOUS }) => ANOMALOUS),
        borderColor: chartPalette.nspocYellow,
        backgroundColor: chartPalette.nspocYellow,
      },
      {
        label: t('collision'),
        data: data.map(({ COLLISION }) => COLLISION),
        borderColor: chartPalette.nspocGreen,
        backgroundColor: chartPalette.nspocGreen,
      },
      {
        label: t('deliberate'),
        data: data.map(({ DELIBERATE }) => DELIBERATE),
        borderColor: chartPalette.lightPurple,
        backgroundColor: chartPalette.lightPurple,
      },
      {
        label: t('electrical'),
        data: data.map(({ ELECTRICAL }) => ELECTRICAL),
        borderColor: chartPalette.turquoise,
        backgroundColor: chartPalette.turquoise,
      },
      {
        label: t('explosion'),
        data: data.map(({ EXPLOSION }) => EXPLOSION),
        borderColor: chartPalette.lightBlue,
        backgroundColor: chartPalette.lightBlue,
      },
      {
        label: t('propulsion'),
        data: data.map(({ PROPULSION }) => PROPULSION),
        borderColor: chartPalette.midBlue,
        backgroundColor: chartPalette.midBlue,
      },
      {
        label: t('small_impactor'),
        data: data.map(({ SMALL_IMPACTOR }) => SMALL_IMPACTOR),
        borderColor: chartPalette.brightBlue,
        backgroundColor: chartPalette.brightBlue,
      },
      {
        label: t('unknown'),
        data: data.map(({ UNKNOWN }) => UNKNOWN),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart
        data={datasets}
        stacked
        ariaLabel="Fragmentation events by type monthly"
        yAxisTitle={t('y_axis_title')}
        xAxisTitle={t('x_axis_title')}
        legend={t('fragmentation_type')}
        name="fragmentation-events-by-type-monthly"
      />
      <Scrollable>
        <DataTable
          columns={fragmentationEventsByTypeMonthlyColumns}
          data={data.reverse()}
          ariaLabel="Information on Fragmentation Events by type Monthly"
        />
      </Scrollable>
    </>
  );
};

export { MonitoringFragmentationEventsByTypeMonthly };
