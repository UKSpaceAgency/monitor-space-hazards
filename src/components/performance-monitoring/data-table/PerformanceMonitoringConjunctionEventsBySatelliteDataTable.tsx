'use client';
import { useTranslations } from 'next-intl';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import { type EventsBySatelliteType, getStatsEventsBySatellite } from '@/actions/getStatsEventsBySatellite';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionsBySatelliteColumns } from './PerformanceMonitoringConjunctionEventsBySatelliteDataTableColumns';

type PerformanceMonitoringConjunctionsBySatelliteDataTableProps = {
  params: TypeGetStatsEventsBySatelliteParams;
  data: EventsBySatelliteType[];
};

const PerformanceMonitoringConjunctionsBySatelliteDataTable = ({ data, params }: PerformanceMonitoringConjunctionsBySatelliteDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_satellite');

  return (
    <>
      <DataTable
        columns={conjunctionsBySatelliteColumns}
        data={data}
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsBySatellite} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsBySatelliteDataTable };
