import { getTranslations } from 'next-intl/server';

import { getStatsMonthlyAnalyses } from '@/actions/getStatsMonthlyAnalyses';
import { chartPalette } from '@/components/charts/base/theme';
import { MonthlyBarChart } from '@/components/charts/monthly-bar/MonthlyBar';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { uksaAnalysesMonthlyColumns } from './data-table/UksaAnalysesMonthlyDataTableColumns';

const UksaAnalysesMonthly = async () => {
  const t = await getTranslations('Charts.Monthly_analyses');
  const data = await getStatsMonthlyAnalyses();

  const datasets = {
    labels: data.map(({ month }) => month),
    datasets: [
      {
        label: t('analyses'),
        data: data.map(({ analyses }) => analyses),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
      {
        label: t('manoeuvre_support_plots'),
        data: data.map(({ manoeuvreSupportPlots }) => manoeuvreSupportPlots),
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart data={datasets} yAxisTitle={t('y_axis_title')} />
      <Scrollable>
        <DataTable
          columns={uksaAnalysesMonthlyColumns}
          data={data}
        />
      </Scrollable>
    </>
  );
};

export { UksaAnalysesMonthly };
