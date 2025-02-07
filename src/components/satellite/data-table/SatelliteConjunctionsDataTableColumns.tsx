'use client';

import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { displayExponential } from '@/utils/Math';

export const satteliteConjunctionColumns: TranslatedColumnDef<TypeEventOut>[] = [
  {
    header: 'Conjunctions.event_information',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'shortId',
        header: 'Conjunctions.event_id',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <Link
              href={`/conjunctions/${value}`}
              className="govuk-link"
            >
              {value}
            </Link>
          );
        },
      },
      {
        accessorKey: 'tcaTime',
        header: 'Conjunctions.closest_approach_at',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return dayjs(value).format(FORMAT_DATE_TIME);
        },
      },
      {
        accessorKey: 'secondaryObjectCommonName',
        header: 'Conjunctions.secondary_object',
        cell: ({ getValue }) => getValue<string>() || 'UNKNOWN',
      },
    ],
  },
  {
    header: 'Conjunctions.miss_distance',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'radialMissDistance',
        header: 'Conjunctions.radial_miss_distance',
      },
      {
        accessorKey: 'missDistance',
        header: 'Conjunctions.total_miss_distance',
      },
    ],
  },
  {
    header: 'Conjunctions.probability_of_collision',
    enableSorting: false,
    columns: [
      {
        accessorKey: `collisionProbability`,
        header: 'Space-Track CDM',
        cell: ({ getValue }) => {
          const value = getValue<number | null>();
          return displayExponential(value, 3);
        },
      },
    ],
  },
];
