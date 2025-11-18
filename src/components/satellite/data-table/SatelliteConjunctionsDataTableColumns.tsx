'use client';

import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { displayExponential } from '@/utils/Math';

export const satteliteConjunctionColumns: TranslatedColumnDef<TypeEventOut>[] = [
  {
    id: 'shortId',
    accessorKey: 'shortId',
    header: 'Conjunctions.table.event_id',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Link href={`/conjunctions/${value}`} className="govuk-link">
          <strong>{value}</strong>
        </Link>
      );
    },
  },
  {
    id: 'secondaryObjectCommonName',
    accessorKey: 'secondaryObjectCommonName',
    header: 'Conjunctions.table.secondary_object',
  },
  {
    id: 'collisionProbability',
    accessorKey: 'collisionProbability',
    header: 'Conjunctions.table.poc_space_track',
    size: 200,
    cell: ({ getValue }) => {
      const collisionProbability = getValue<number>();
      if (collisionProbability === undefined) {
        return '-';
      }
      return displayExponential(collisionProbability, 4);
    },
  },
  {
    id: 'collisionProbabilityUksa',
    accessorKey: 'collisionProbabilityUksa',
    header: 'Conjunctions.table.poc_uksa',
    cell: ({ getValue }) => {
      const collisionProbability = getValue<number>();
      if (collisionProbability === undefined) {
        return '-';
      }
      return displayExponential(collisionProbability, 4);
    },
  },
  {
    id: 'missDistance',
    accessorKey: 'missDistance',
    header: 'Conjunctions.table.total_miss_distance',
  },
  {
    id: 'tcaTime',
    accessorKey: 'tcaTime',
    header: 'Conjunctions.table.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_FULL_MONTH),
  },
  {
    id: 'time',
    enableSorting: false,
    accessorKey: 'tcaTime',
    header: 'Conjunctions.table.time',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_TIME),
  },
];
