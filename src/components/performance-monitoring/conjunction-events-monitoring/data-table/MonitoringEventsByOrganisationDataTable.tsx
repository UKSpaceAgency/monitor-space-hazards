'use client';
import { useTranslations } from 'next-intl';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import type { EventsByOrganizationType } from '@/actions/getStatsEventsByOrganization';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import { DataTable } from '@/components/DataTable';
import { DownloadData } from '@/components/DownloadData';

import { eventsByOrganisationColumns } from './MonitoringEventsByOrganisationDataTableColumns';

type MonitoringEventsByOrganisationDataTableProps = {
  params: TypeGetStatsEventsByOrganizationParams;
  data: EventsByOrganizationType[];
};

const MonitoringEventsByOrganisationDataTable = ({ data, params }: MonitoringEventsByOrganisationDataTableProps) => {
  const t = useTranslations('Tables.Performance_monitoring.conjunction_events_by_organisation');

  return (
    <>
      <DataTable
        columns={eventsByOrganisationColumns}
        data={data}
        ariaLabel="Information on Events by organisation"
      />
      <DownloadData type={t('this_table')} params={params} downloadAction={getStatsEventsByOrganization} />
    </>
  );
};

export { MonitoringEventsByOrganisationDataTable };
