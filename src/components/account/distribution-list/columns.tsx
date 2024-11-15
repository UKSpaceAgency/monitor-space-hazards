import Link from 'next/link';

import type { TypeAlertSettingsDistributionList } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const getDistributionListColumns = (): TranslatedColumnDef<TypeAlertSettingsDistributionList>[] => ([
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    enableSorting: false,
    cell: ({ row }) =>
      `${row.original.first_name} ${row.original.last_name}`,
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: 'Email',
    enableSorting: false,
  },
  {
    accessorKey: 'organization_name',
    id: 'organization_name',
    header: 'Organisation/department',
    enableSorting: false,
  },
  {
    accessorKey: 'phone_number',
    id: 'phone_number',
    enableSorting: false,
    header: 'Phone number',
  },
  {
    id: 'user_id',
    accessorKey: `user_id`,
    enableSorting: false,
    header: () => <span style={{ visibility: 'hidden' }}></span>,
    cell: ({ getValue }: any) => (
      <Link
        href={`/account/alert-settings/${getValue() as string}`}
        className="govuk-link"
      >
        Edit
      </Link>
    ),
  },
]);
