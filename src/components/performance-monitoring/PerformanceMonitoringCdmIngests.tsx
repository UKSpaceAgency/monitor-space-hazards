import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import Details from '@/ui/details/details';

import { DownloadData } from '../DownloadData';
import { PerformanceMonitoringCdmIngestsDataTable } from './data-table/PerformanceMonitoringCdmIngestsDataTable';

const PerformanceMonitoringCdmIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.cdm_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    sort_by: 'created_at',
    limit: 50,
  };

  const data = await getExternalDataPerformance(params);

  return (
    <>
      <PerformanceMonitoringCdmIngestsDataTable data={data} params={params} />
      <DownloadData type={t('title')} params={{}} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { PerformanceMonitoringCdmIngests };
