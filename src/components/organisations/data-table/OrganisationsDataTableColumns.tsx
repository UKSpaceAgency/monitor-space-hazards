'use client';

import Link from 'next/link';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const organisationsColumns: TranslatedColumnDef<TypeOrganizationOut>[] = [
  {
    accessorKey: 'name',
    header: 'Organisations.organisation',
    cell: ({ renderValue, row }) => (
      <Link
        href={`/organisations/${row?.original.id}`}
        className="govuk-link"
      >
        {renderValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Organisations.created_at',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
  },
  {
    accessorKey: 'satellites_count',
    header: 'Organisations.registered_satellites',
  },
];
