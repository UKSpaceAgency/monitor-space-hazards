import { useTranslations } from 'next-intl';

import type { TypeGetStatsEventsTypeParams, TypeStatisticsEventsType } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionsByEventTypeColumns } from './PerformanceMonitoringConjunctionsByEventTypeDataTableColumns';

type PerformanceMonitoringConjunctionsByEventTypeDataTableProps = {
  data: TypeStatisticsEventsType[];
  params: TypeGetStatsEventsTypeParams;
};

const PerformanceMonitoringConjunctionsByEventTypeDataTable = ({ data, params }: PerformanceMonitoringConjunctionsByEventTypeDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_type');

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
