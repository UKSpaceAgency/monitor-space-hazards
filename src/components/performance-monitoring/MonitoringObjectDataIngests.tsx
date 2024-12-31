import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceAggregatedParams, TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { getExternalDataPerformanceAggregated } from '@/actions/getExternalDataPerformanceAggregated';
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

  const aggregatedParams: TypeGetExternalDataPerformanceAggregatedParams = {
    limit: 9999,
    max_age_days: 7,
    sort_order: 'desc',
  };

  const data = await getExternalDataPerformance(params);
  const chartData = await getExternalDataPerformanceAggregated(aggregatedParams);

  return (
    <>
      <ObjectDataIngests initialData={chartData} params={aggregatedParams} />
      <MonitoringDataPerformanceDataTable data={data} params={params} />
      <DownloadData type={t('object_data_ingests')} params={params} downloadAction={getExternalDataPerformance} />
      <Details summary={t('details.title')}>
        {t.rich('details.content')}
      </Details>
    </>
  );
};

export { MonitoringObjectDataIngests };
