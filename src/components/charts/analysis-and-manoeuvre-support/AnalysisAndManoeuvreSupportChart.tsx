'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

export type AnalysisAndManoeuvreSupportChartProps = {
  data: AnalysisAndManoeuvreSupportStatsType[];
  actionButtons: ReactNode;
  latestIngestDate: string;
};

const AnalysisAndManoeuvreSupportChart = ({
  data,
  actionButtons,
  latestIngestDate,
}: AnalysisAndManoeuvreSupportChartProps) => {
  const t = useTranslations('Charts.Analysis_and_manoeuvre_support');

  const datasets = useMemo(
    () => ({
      datasets: [
        {
          label: t('analysis_received'),
          data: data.map(({ analysesCount, date }) => ({
            x: date as unknown as number,
            y: analysesCount,
          })),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
        {
          label: t('manoeuvre_received'),
          data: data.map(({ manoeuvreSupportCount, date }) => ({
            x: date as unknown as number,
            y: manoeuvreSupportCount,
          })),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
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
        legend={{ title: t('file_type') }}
        yAxisTitle={t('number_received')}
      />
    </div>
  );
};

export { AnalysisAndManoeuvreSupportChart };
