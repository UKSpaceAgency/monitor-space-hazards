'use client';

import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { displayExponential } from '@/utils/Math';

export const satteliteConjunctionColumns: TranslatedColumnDef<TypeEventOut>[] = [
  {
    id: 'short_id',
    accessorKey: 'short_id',
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
    id: 'secondary_object_common_name',
    accessorKey: 'secondary_object_common_name',
    header: 'Conjunctions.table.secondary_object',
  },
  {
    id: 'collision_probability',
    accessorKey: 'collision_probability',
    header: 'Conjunctions.table.poc_space_track',
    size: 200,
    cell: ({ getValue }) => {
      const collision_probability = getValue<number>();
      if (collision_probability === undefined) {
        return '-';
      }
      return displayExponential(collision_probability, 4);
    },
  },
  {
    id: 'collision_probability_uksa',
    accessorKey: 'collision_probability_uksa',
    header: 'Conjunctions.table.poc_uksa',
    cell: ({ getValue }) => {
      const collision_probability = getValue<number>();
      if (collision_probability === undefined) {
        return '-';
      }
      return displayExponential(collision_probability, 4);
    },
  },
  {
    id: 'miss_distance',
    accessorKey: 'miss_distance',
    header: 'Conjunctions.table.total_miss_distance',
  },
  {
    id: 'tca_time',
    accessorKey: 'tca_time',
    header: 'Conjunctions.table.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_FULL_MONTH),
  },
  {
    id: 'time',
    enableSorting: false,
    accessorKey: 'tca_time',
    header: 'Conjunctions.table.time',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_TIME),
  },
];
