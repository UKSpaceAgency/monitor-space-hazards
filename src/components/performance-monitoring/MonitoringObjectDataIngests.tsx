import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import ObjectDataIngests from '../charts/object-data-ingests/ObjectDataIngests';
import { DownloadData } from '../DownloadData';
import { MonitoringDataPerformanceDataTable } from './data-table/MonitoringDataPerformanceDataTable';

const MonitoringObjectDataIngests = async () => {
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
      <ObjectDataIngests latestIngestDate={latestIngestDate} />
      <MonitoringDataPerformanceDataTable params={params} />
      <DownloadData type={t('object_data_ingests')} params={params} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringObjectDataIngests };
