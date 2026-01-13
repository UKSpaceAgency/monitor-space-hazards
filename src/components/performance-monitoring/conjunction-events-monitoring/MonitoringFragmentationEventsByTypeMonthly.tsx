import type { ChartDataset } from 'chart.js';
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
    datasets: [] as ChartDataset<'bar'>[],
  };

  const Explosion = data.map(({ EXPLOSION }) => EXPLOSION);
  if (Explosion.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('explosion'),
      data: Explosion,
      borderColor: chartPalette.nspocBlue,
      backgroundColor: chartPalette.nspocBlue,
    });
  }

  const Collision = data.map(({ COLLISION }) => COLLISION);
  if (Collision.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('collision'),
      data: Collision,
      borderColor: chartPalette.nspocRed,
      backgroundColor: chartPalette.nspocRed,
    });
  }

  const Unknown = data.map(({ UNKNOWN }) => UNKNOWN);
  if (Unknown.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('unknown'),
      data: Unknown,
      borderColor: chartPalette.nspocYellow,
      backgroundColor: chartPalette.nspocYellow,
    });
  }

  const Accidental = data.map(({ ACCIDENTAL }) => ACCIDENTAL);
  if (Accidental.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('accidental'),
      data: Accidental,
      borderColor: chartPalette.nspocGreen,
      backgroundColor: chartPalette.nspocGreen,
    });
  }

  const Deliberate = data.map(({ DELIBERATE }) => DELIBERATE);
  if (Deliberate.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('deliberate'),
      data: Deliberate,
      borderColor: chartPalette.rose,
      backgroundColor: chartPalette.rose,
    });
  }

  const Propulsion = data.map(({ PROPULSION }) => PROPULSION);
  if (Propulsion.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('propulsion'),
      data: Propulsion,
      borderColor: chartPalette.skin,
      backgroundColor: chartPalette.skin,
    });
  }

  const Electrical = data.map(({ ELECTRICAL }) => ELECTRICAL);
  if (Electrical.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('electrical'),
      data: Electrical,
      borderColor: chartPalette.black,
      backgroundColor: chartPalette.black,
    });
  }

  const Anomalous = data.map(({ ANOMALOUS }) => ANOMALOUS);
  if (Anomalous.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('anomalous'),
      data: Anomalous,
      borderColor: chartPalette.gray2,
      backgroundColor: chartPalette.gray2,
    });
  }

  const SmallImpactor = data.map(({ SMALL_IMPACTOR }) => SMALL_IMPACTOR);
  if (SmallImpactor.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('small_impactor'),
      data: SmallImpactor,
      borderColor: chartPalette.midGrey,
      backgroundColor: chartPalette.midGrey,
    });
  }

  const Aerodynamics = data.map(({ AERODYNAMICS }) => AERODYNAMICS);
  if (Aerodynamics.some(count => count > 0)) {
    datasets.datasets.push({
      label: t('aerodynamics'),
      data: Aerodynamics,
      borderColor: chartPalette.lightGrey,
      backgroundColor: chartPalette.lightGrey,
    });
  }

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
