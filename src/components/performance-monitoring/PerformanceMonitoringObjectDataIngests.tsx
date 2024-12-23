import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { PerformanceMonitoringDataPerformanceDataTable } from './data-table/PerformanceMonitoringDataPerformanceDataTable';

const PerformanceMonitoringObjectDataIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.object_data_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['Satellite'],
    limit: 50,
  };

  const data = await getExternalDataPerformance(params);

  return (
    <>
      <PerformanceMonitoringDataPerformanceDataTable data={data} params={params} />
      <DownloadData type={t('title')} params={params} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { PerformanceMonitoringObjectDataIngests };
