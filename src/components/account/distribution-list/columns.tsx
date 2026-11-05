'use client';

import Link from 'next/link';

import type { TypeAlertSettingsDistributionListOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const distributionListColumns: TranslatedColumnDef<TypeAlertSettingsDistributionListOut>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: ({ row }) =>
      `${row.original.first_name} ${row.original.last_name}`,
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'organization_name',
    id: 'organization_name',
    header: 'Organisation/department',
  },
  {
    accessorKey: 'phone_number',
    id: 'phone_number',
    header: 'Phone number',
  },
  {
    id: 'user_id',
    accessorKey: `user_id`,
    enableSorting: false,
    header: () => <span style={{ visibility: 'hidden' }}>Edit</span>,
    cell: ({ getValue }) => (
      <Link
        href={`/account/alert-settings/${getValue<string>()}`}
        className="govuk-link"
      >
        Edit
      </Link>
    ),
  },
];
