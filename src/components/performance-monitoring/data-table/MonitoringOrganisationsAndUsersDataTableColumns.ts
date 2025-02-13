import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import type { TranslatedColumnDef } from '@/types';

export const usersAndOrganisationsColumns: TranslatedColumnDef<StatsMonthlyOrganizationsType>[] = [
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.organisations_and_users.month',
    enableSorting: false,
  },
  {
    accessorKey: 'users',
    id: 'users',
    header: 'Performance_monitoring.organisations_and_users.users',
    enableSorting: false,
  },
  {
    accessorKey: 'organisations',
    id: 'organisations',
    header: 'Performance_monitoring.organisations_and_users.organisations',
    enableSorting: false,
  },
];
