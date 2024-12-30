'use client';
import { useTranslations } from 'next-intl';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import type { EventsByOrganizationType } from '@/actions/getStatsEventsByOrganization';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { conjunctionsByOrganisationColumns } from './PerformanceMonitoringConjunctionEventsByOrganisationDataTableColumns';

type PerformanceMonitoringConjunctionsByOrganisationDataTableProps = {
  params: TypeGetStatsEventsByOrganizationParams;
  data: EventsByOrganizationType[];
};

const PerformanceMonitoringConjunctionsByOrganisationDataTable = ({ data, params }: PerformanceMonitoringConjunctionsByOrganisationDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_organisation');

  return (
    <>
      <DataTable
        columns={conjunctionsByOrganisationColumns}
        data={data}
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsByOrganization} />
    </>
  );
};

export { PerformanceMonitoringConjunctionsByOrganisationDataTable };
