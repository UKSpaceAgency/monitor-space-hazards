import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { DataPerformanceChart } from '@/components/charts/data-performance-chart/DataPerformanceChart';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { DataPerformanceDataTable } from './data-table/DataPerformanceDataTable';

const TipIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.tip_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['Tracking and Impact Prediction'],
    sort_by: 'ingestion_start',
    limit: 50,
    sort_order: 'desc',
  };

  const latestIngestArray = await getExternalDataPerformance({
    ...params,
    limit: 1,
  });

  const latestIngestDate = latestIngestArray[0]?.ingestionEnd ? dayjs(latestIngestArray[0]?.ingestionEnd).format(FORMAT_DATE_TIME) : t('unknown');

  return (
    <>
      <DataPerformanceChart latestIngestDate={latestIngestDate} sourceType="Tracking and Impact Prediction" xAxisTitle={t('x_axis_title')} legend={t('legend')} />
      <DataPerformanceDataTable params={params} />
      <DownloadData type={t('title')} params={params} downloadAction={getExternalDataPerformance} />
    </>
  );
};

export { TipIngests };
