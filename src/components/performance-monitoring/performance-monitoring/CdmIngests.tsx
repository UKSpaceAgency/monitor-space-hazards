import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { DataPerformanceChart } from '@/components/charts/data-performance-chart/DataPerformanceChart';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { DataPerformanceDataTable } from './data-table/DataPerformanceDataTable';

const CdmIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.cdm_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['CDM'],
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
      <DataPerformanceChart latestIngestDate={latestIngestDate} sourceType="CDM" xAxisTitle={t('x_axis_title')} yAxisTitle={t('y_axis_title')} legend={t('legend')} ariaLabel="Conjunction Data Message" />
      <DataPerformanceDataTable params={params} ariaLabel="Information on CDM Ingests" />
      <DownloadData type={t('title')} params={params} downloadAction={getExternalDataPerformance} ariaLabel="Cdm Ingest" />
      <Details summary={t.rich('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { CdmIngests };
