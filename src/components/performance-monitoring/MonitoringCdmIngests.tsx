import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import Details from '@/ui/details/details';

import CdmIngestsChart from '../charts/cdm-ingests/CdmIngests';
import { DownloadData } from '../DownloadData';
import { MonitoringDataPerformanceDataTable } from './data-table/MonitoringDataPerformanceDataTable';

const MonitoringCdmIngests = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.cdm_ingests');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['CDM'],
    sort_by: 'ingestion_start',
    limit: 50,
    sort_order: 'desc',
  };

  return (
    <>
      <CdmIngestsChart />
      <MonitoringDataPerformanceDataTable params={params} />
      <DownloadData type={t('title')} params={params} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringCdmIngests };
