import Link from 'next/link';

import type { TranslatedColumnDef } from '@/types';

type ReasonRow = {
  satellite: string;
  noradId: string;
  planned: number;
  unplanned: number;
  positionChange: number;
  missingData: number;
  total: number;
};

export const reasonColumns: TranslatedColumnDef<ReasonRow>[] = [
  {
    accessorKey: 'satellite',
    id: 'satellite',
    header: 'Organisation_activity_by_reason.satellite',
    enableSorting: false,
    cell: ({ row }) => (
      <Link href={`/satellites/${row.original.noradId}`} className="govuk-link">
        {row.original.satellite}
      </Link>
    ),
  },
  {
    accessorKey: 'planned',
    id: 'planned',
    header: 'Organisation_activity_by_reason.manoeuvre_planned',
    enableSorting: false,
  },
  {
    accessorKey: 'unplanned',
    id: 'unplanned',
    header: 'Organisation_activity_by_reason.manoeuvre_unplanned',
    enableSorting: false,
  },
  {
    accessorKey: 'positionChange',
    id: 'positionChange',
    header: 'Organisation_activity_by_reason.position_change',
    enableSorting: false,
  },
  {
    accessorKey: 'missingData',
    id: 'missingData',
    header: 'Organisation_activity_by_reason.missing_data',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Organisation_activity_by_reason.total',
    enableSorting: false,
  },
];
