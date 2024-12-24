import { getTranslations } from 'next-intl/server';

import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionsByEventTypeColumns } from './PerformanceMonitoringConjunctionsByEventTypeDataTableColumns';

const PerformanceMonitoringConjunctionsByEventTypeDataTable = async () => {
  const t = await getTranslations('Tables.Performance_monitoring.conjunction_events_by_type');

  const data = await getStatsEventsType();

  return (
    <>
      <DataTable
        columns={conjunctionsByEventTypeColumns}
        data={data}
      />
      <DownloadData type={t('this_table')} params={{}} downloadAction={getStatsEventsType} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsByEventTypeDataTable };
