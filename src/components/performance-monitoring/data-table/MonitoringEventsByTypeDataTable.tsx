import { useTranslations } from 'next-intl';

import type { TypeGetStatsEventsTypeParams, TypeStatisticsEventsType } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { eventsByTypeColumns } from './MonitoringEventsByTypeDataTableColumns';

type MonitoringEventsByTypeDataTableProps = {
  data: TypeStatisticsEventsType[];
  params: TypeGetStatsEventsTypeParams;
};

const MonitoringEventsByTypeDataTable = ({ data, params }: MonitoringEventsByTypeDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_type');

  return (
    <>
      <DataTable
        columns={eventsByTypeColumns}
        data={data}
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsType} />
    </>
  );
};

export { MonitoringEventsByTypeDataTable };
