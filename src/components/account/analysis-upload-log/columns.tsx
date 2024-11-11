'use client';

import Link from 'next/link';

import type { TypeAnalysisOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const columns: TranslatedColumnDef<TypeAnalysisOut>[] = [
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'AnalysisData.date',
    size: 150,
    cell: ({ getValue, row }) => (
      <Link
        href={`/account/analysis_upload_log/${row?.original.cdmExternalId}`}
        passHref
        className="govuk-link"
      >
        {getValue() as string}
      </Link>
    ),
  },
  {
    id: 'uploadedByEmail',
    accessorKey: 'uploadedByEmail',
    header: 'AnalysisData.user_email',
    size: 100,
  },
  {
    id: 'eventId',
    accessorKey: 'eventId',
    header: 'AnalysisData.event_id',
    size: 100,
  },
  {
    id: `isActive`,
    accessorKey: `isActive`,
    header: 'AnalysisData.file_uploaded',
    size: 100,
  },
];
