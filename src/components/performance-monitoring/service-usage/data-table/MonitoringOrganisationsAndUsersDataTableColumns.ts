'use client';

import type { StatsMonthlyOrganizationsType } from '@/actions/getStatsMonthlyOrganizations';
import { dayjs } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const usersAndOrganisationsColumns: TranslatedColumnDef<StatsMonthlyOrganizationsType>[] = [
  {
    accessorKey: 'month',
    header: 'Performance_monitoring.organisations_and_users.month',
    enableSorting: false,
    cell: ({ row }) => dayjs(row.original.month).format('MM/YYYY'),
  },
  {
    accessorKey: 'users',
    header: 'Performance_monitoring.organisations_and_users.users',
    enableSorting: false,
  },
  {
    accessorKey: 'organisations',
    header: 'Performance_monitoring.organisations_and_users.organisations',
    enableSorting: false,
  },
];
