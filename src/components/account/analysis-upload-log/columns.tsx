'use client';

import Link from 'next/link';

import type { TypeAnalysisOut } from '@/__generated__/data-contracts';
import { formatDateTime } from '@/libs/Date';
import type { TranslatedColumnDef } from '@/types';

export const columns: TranslatedColumnDef<TypeAnalysisOut>[] = [
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'AnalysisData.date',
    cell: ({ getValue }) => formatDateTime(getValue() as string),
  },
  {
    id: 'uploadedByEmail',
    accessorKey: 'uploadedByEmail',
    header: 'AnalysisData.user_email',
  },
  {
    id: 'eventShortId',
    accessorKey: 'eventShortId',
    header: 'AnalysisData.event_id',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <Link href={`/conjunctions/${value}`} passHref className="govuk-link">
          {value}
        </Link>
      );
    },
  },
  {
    id: 'eventId',
    accessorKey: 'eventId',
    header: 'AnalysisData.file_uploaded',
  },
  {
    id: 'Delete',
    enableSorting: false,
  },
];
