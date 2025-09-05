'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import type { DataRangeType } from '@/hooks/useDataRange';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';
import { DateRange } from '../date-range/date-range';

export type AnalysisAndManoeuvreSupportChartProps = {
  data: AnalysisAndManoeuvreSupportStatsType[];
  latestIngestDate: string;
  dataRange: DataRangeType;
  handleDataRangeChange: (dataRange: DataRangeType) => void;
};

const AnalysisAndManoeuvreSupportChart = ({
  data,
  dataRange,
  handleDataRangeChange,
  latestIngestDate,
}: AnalysisAndManoeuvreSupportChartProps) => {
  const t = useTranslations('Charts.Analysis_and_manoeuvre_support');

  const actionButtons = <DateRange dataRange={dataRange} handleDataRangeChange={handleDataRangeChange} ariaLabel="NSpOC conjunction event analysis and manoeuvre support" />;

  const datasets = useMemo(
    () => ({
      datasets: [
        {
          label: t('analysis_received'),
          data: data.map(({ analysesCount, date }) => ({
            x: date as unknown as number,
            y: analysesCount,
          })),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
        },
        {
          label: t('manoeuvre_received'),
          data: data.map(({ manoeuvreSupportCount, date }) => ({
            x: date as unknown as number,
            y: manoeuvreSupportCount,
          })),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
      ],
    }),
    [data, t],
  );

  return (
    <div className="mb-4">
      <p className="govuk-body-s">
        {t('latest_ingest')}
        {latestIngestDate}
      </p>
      <BaseChart
        name="analysis-ingests-chart"
        data={datasets}
        actionButtons={actionButtons}
        isDay
        ariaLabel="NSpOC conjunction event analysis and manoeuvre support"
        legend={{ title: t('file_type') }}
        yAxisTitle={t('number_received')}
        xAxisTitle={t('date')}
      />
    </div>
  );
};

export { AnalysisAndManoeuvreSupportChart };
