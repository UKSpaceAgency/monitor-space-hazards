'use client';

import Link from 'next/link';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';
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
    enableSorting: false,
  },
  {
    accessorKey: 'satellites_count',
    header: 'Organisations.registered_satellites',
    size: 200,
    enableSorting: false,
  },
];
