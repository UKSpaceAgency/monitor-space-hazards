import Link from 'next/link';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { AccountType } from '@/utils/Roles';

export const organisationUsersTableColumns: TranslatedColumnDef<TypeUserOut>[] = [
  {
    accessorKey: 'last_name',
    id: 'last_name',
    header: 'Organisation_users.name',
    cell: ({ row }) =>
      `${row.original.first_name} ${row.original.last_name}`,
  },
  {
    accessorKey: 'role',
    id: 'role',
    header: 'Organisation_users.account_type',
    cell: ({ row }) =>
      row.original.role ? AccountType[row.original.role] : '-',
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: 'Organisation_users.email',
  },
  {
    accessorKey: 'phone_number',
    id: 'phone_number',
    header: 'Organisation_users.phone_number',
  },
  {
    accessorKey: 'account_details_confirmed_at',
    id: 'account_details_confirmed_at',
    header: 'Organisation_users.registered',
    cell: ({ row }) =>
      row.original.account_details_confirmed_at ? dayjs(row.original.account_details_confirmed_at).format(FORMAT_SHORT_DATE) : '-',
  },
  {
    id: 'id',
    accessorKey: `id`,
    enableSorting: false,
    header: () => <span style={{ visibility: 'hidden' }}>Edit</span>,
    cell: ({ row }) => (
      <Link
        href={`/account/organisations/${row.original.organization_id}/${row.original.id}`}
        className="govuk-link"
      >
        Edit
      </Link>
    ),
  },
];
