'use client';

import Link from 'next/link';

import type { TypeAnalysisOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const columns: TranslatedColumnDef<TypeAnalysisOut>[] = [
  {
    id: 'commonName',
    accessorKey: 'commonName',
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
    id: 'user_email',
    accessorKey: 'user_email',
    header: 'AnalysisData.user_email',
    size: 100,
  },
  {
    id: 'event_id',
    accessorKey: 'event_id',
    header: 'AnalysisData.event_id',
    size: 100,
  },
  {
    id: `file_uploaded`,
    accessorKey: `metadata.futureEventsCount`,
    header: 'AnalysisData.file_uploaded',
    enableSorting: false,
  },
];
