'use client';

import type { OrganisationAndUsersStatsType } from '@/actions/getOrganisationsAndUsersStats';
import { DataTable } from '@/components/DataTable';

import { usersAndOrganisationsColumns } from './MonitoringOrganisationsAndUsersDataTableColumns';

type MonitoringOrganisationsAndUsersDataTableProps = {
  data: OrganisationAndUsersStatsType[];
};

const MonitoringOrganisationsAndUsersDataTable = ({ data }: MonitoringOrganisationsAndUsersDataTableProps) => {
  return (
    <div className="overflow-auto max-h-[400px]">
      <DataTable
        columns={usersAndOrganisationsColumns}
        data={data}
      />
    </div>
  );
};

export { MonitoringOrganisationsAndUsersDataTable };
