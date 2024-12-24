import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { DataTable } from '@/components/DataTable';

import { conjunctionsByEventTypeColumns } from './PerformanceMonitoringConjunctionsByEventTypeDataTableColumns';

const PerformanceMonitoringConjunctionsByEventTypeDataTable = async () => {
  const data = await getStatsEventsType();

  return (
    <DataTable
      columns={conjunctionsByEventTypeColumns}
      data={data}
    />
  );
};

export { PerformanceMonitoringConjunctionsByEventTypeDataTable };
