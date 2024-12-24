import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionsByEventTypeColumns } from './PerformanceMonitoringConjunctionsByEventTypeDataTableColumns';

const PerformanceMonitoringConjunctionsByEventTypeDataTable = async () => {
  const t = await getTranslations('Tables.Performance_monitoring.conjunction_events_by_type');

  const params: TypeGetStatsEventsTypeParams = {};

  const data = await getStatsEventsType(params);

  return (
    <>
      <DataTable
        columns={conjunctionsByEventTypeColumns}
        data={data}
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsType} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsByEventTypeDataTable };
