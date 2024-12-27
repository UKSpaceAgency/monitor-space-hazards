'use client';

import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';

import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_API_DATE, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';

import BaseChart from '../base/BaseChart';
import { chartPalette } from '../base/theme';

export type AnalysisAndManoeuvreSupportChartProps = {
  data: AnalysisAndManoeuvreSupportStatsType[];
  setStartDate: Dispatch<SetStateAction<string>>;
  startDate: string;
};

const AnalysisAndManoeuvreSupportChart = ({
  data,
  setStartDate,
  startDate,
}: AnalysisAndManoeuvreSupportChartProps) => {
  const t = useTranslations('Charts.AnalysisAndManoeuvreSupport');

  const datasets = useMemo(
    () => ({
      datasets: [
        {
          label: t('analysis_received'),
          data: data.map(
            ({ analysesCount: y, month: x }) => ({ x, y }),
          ),
          borderColor: chartPalette.orange,
          backgroundColor: chartPalette.orange,
        },
        {
          label: t('manoeuvre_received'),
          data: data.map(
            ({ manoeuvreSupportCount: y, month: x }) => ({ x, y }),
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
            value: dayjs().subtract(7, 'day').format(FORMAT_API_DATE),
          },
          {
            title: '30d',
            ariaLabel: t('30_days'),
            value: dayjs().subtract(30, 'day').format(FORMAT_API_DATE),
          },
          {
            title: 'All',
            ariaLabel: t('all_time'),
            value: 0,
          },
        ]}
        active={startDate}
        setActive={setStartDate}
        title={t('date_range')}
      />
    ),
    [setStartDate, startDate, t],
  );

  const latestIngest = useMemo(() => {
    return dayjs(data[0]?.month).format(FORMAT_DATE_TIME);
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
