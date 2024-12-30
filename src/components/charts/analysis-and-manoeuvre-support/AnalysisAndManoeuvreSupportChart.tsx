'use client';

import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';

import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

export type AnalysisAndManoeuvreSupportChartProps = {
  data: AnalysisAndManoeuvreSupportStatsType[];
  setShowDays: Dispatch<SetStateAction<number>>;
  showDays: number;
};

const AnalysisAndManoeuvreSupportChart = ({
  data,
  setShowDays,
  showDays,
}: AnalysisAndManoeuvreSupportChartProps) => {
  const t = useTranslations('Charts.Analysis_and_manoeuvre_support');

  const datasets = useMemo(
    () => ({
      datasets: [
        {
          label: t('analysis_received'),
          data: data.map(
            ({ analysesCount: y, date: x }) => ({ x, y }),
          ),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
        {
          label: t('manoeuvre_received'),
          data: data.map(
            ({ manoeuvreSupportCount: y, date: x }) => ({ x, y }),
          ),
          borderColor: chartPalette.darkBlue,
          backgroundColor: chartPalette.darkBlue,
        },
      ] as any,
    }),
    [data, t],
  );

  const actionButtons = useMemo(
    () => (
      <ToggleButtons
        name="analysis-ingest-days"
        items={[
          {
            title: '7d',
            ariaLabel: t('7_days'),
            value: 7,
          },
          {
            title: '30d',
            ariaLabel: t('30_days'),
            value: 30,
          },
          {
            title: 'All',
            ariaLabel: t('all_time'),
            value: 9999,
          },
        ]}
        active={showDays}
        setActive={setShowDays}
        title={t('date_range')}
      />
    ),
    [setShowDays, showDays, t],
  );

  const latestIngest = useMemo(() => {
    return dayjs(data[0]?.date).format(FORMAT_DATE_TIME);
  }, [data]);

  return (
    <div className="mb-4">
      <p className="govuk-body-s">
        {t('latest_ingest')}
        {latestIngest}
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
