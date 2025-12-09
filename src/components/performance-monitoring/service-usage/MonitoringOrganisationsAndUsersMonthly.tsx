'use client';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import { OrganisationsAndUsersChart } from '@/components/charts/organisations-and-users/OrganisationsAndUsers';
import { DataTable } from '@/components/DataTable';
import { Scrollable } from '@/components/Scrollable';

import { usersAndOrganisationsColumns } from './data-table/MonitoringOrganisationsAndUsersDataTableColumns';

const MonitoringOrganisationsAndUsersMonthly = ({ data }: { data: StatsMonthlyOrganizationsType[] }) => {
  return (
    <>
      <OrganisationsAndUsersChart data={data} />
      <Scrollable>
        <DataTable
          columns={usersAndOrganisationsColumns}
          data={data}
          ariaLabel="Information on Organisations and Users"
        />
      </Scrollable>
    </>
  );
};

export { MonitoringOrganisationsAndUsersMonthly };
