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
        borderColor: chartPalette.darkBlue,
        backgroundColor: chartPalette.darkBlue,
      },
      {
        label: t('manoeuvre_support_plots'),
        data: data.map(({ manoeuvreSupportPlots }) => manoeuvreSupportPlots),
        borderColor: chartPalette.orange,
        backgroundColor: chartPalette.orange,
      },
    ],
  };

  return (
    <>
      <MonthlyBarChart data={datasets} yAxisTitle={t('y_axis_title')} xAxisTitle={t('x_axis_title')} ariaLabel="NSpOC conjunction event analysis and manoeuvre support monthly" />
      <Scrollable>
        <DataTable
          columns={uksaAnalysesMonthlyColumns}
          data={data.reverse()}
          ariaLabel="Information on Uksa analyses Monthly"
        />
      </Scrollable>
    </>
  );
};

export { UksaAnalysesMonthly };
