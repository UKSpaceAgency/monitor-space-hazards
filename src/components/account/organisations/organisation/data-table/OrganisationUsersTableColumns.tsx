import Link from 'next/link';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { AccountType } from '@/utils/Roles';

export const organisationUsersTableColumns: TranslatedColumnDef<TypeUserOut>[] = [
  {
    accessorKey: 'lastName',
    id: 'lastName',
    header: 'Organisation_users.name',
    cell: ({ row }) =>
      `${row.original.firstName} ${row.original.lastName}`,
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
    accessorKey: 'phoneNumber',
    id: 'phoneNumber',
    header: 'Organisation_users.phone_number',
  },
  {
    accessorKey: 'accountDetailsConfirmedAt',
    id: 'accountDetailsConfirmedAt',
    header: 'Organisation_users.registered',
    cell: ({ row }) =>
      row.original.accountDetailsConfirmedAt ? dayjs(row.original.accountDetailsConfirmedAt).format(FORMAT_SHORT_DATE) : '-',
  },
  {
    id: 'id',
    accessorKey: `id`,
    enableSorting: false,
    header: () => <span style={{ visibility: 'hidden' }}>Edit</span>,
    cell: ({ row }) => (
      <Link
        href={`/account/organisations/${row.original.organizationId}/${row.original.id}`}
        className="govuk-link"
      >
        Edit
      </Link>
    ),
  },
];
