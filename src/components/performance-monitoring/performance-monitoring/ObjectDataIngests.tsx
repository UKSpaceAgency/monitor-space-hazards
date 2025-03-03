import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { DataPerformanceChart } from '@/components/charts/data-performance-chart/DataPerformanceChart';
import { DownloadData } from '@/components/DownloadData';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { DataPerformanceDataTable } from './data-table/DataPerformanceDataTable';

const ObjectDataIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.object_data_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['Satellite'],
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
      <DataPerformanceChart latestIngestDate={latestIngestDate} sourceType="Satellite" xAxisTitle={t('x_axis_title')} legend={t('legend')} />
      <DataPerformanceDataTable params={params} />
      <DownloadData type={t('legend')} params={params} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { ObjectDataIngests };
