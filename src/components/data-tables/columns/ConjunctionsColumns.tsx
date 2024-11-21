'use client';

import Link from 'next/link';

import type { TypeAdditionalAnalysis, TypeEventOut, TypeUserRole } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { DisplayUnit, TranslatedColumnDef } from '@/types';
import { isAnalysist } from '@/utils/Roles';

export const conjunctionColumns = ({ role, displayUnit }: { role?: TypeUserRole | null; displayUnit?: DisplayUnit }): TranslatedColumnDef<TypeEventOut>[] => [
  {
    id: 'baseData',
    header: 'Conjunctions.event_information',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'userInterest',
        header: 'Conjunctions.user_interest',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          if (value === 'High') {
            return (
              <strong className="govuk-tag govuk-tag--red">High</strong>
            );
          }
          return '';
        },
      },
      {
        accessorKey: 'shortId',
        header: 'Conjunctions.short_id',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <Link
              href={`/conjunctions/${value}`}
              passHref
              className="govuk-link"
            >
              {value}
            </Link>
          );
        },
      },
      {
        id: 'tcaTime',
        accessorKey: 'tcaTime',
        header: 'Conjunctions.closest_approach_at',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return dayjs(value).format(FORMAT_DATE_TIME);
        },
      },
    ],
  },
  {
    id: 'objects',
    header: 'Conjunctions.objects',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'primaryObjectCommonName',
        header: 'Conjunctions.primary',
        cell: ({ row, renderValue }) => (
          <Link
            href={`/satellites/${row.original.primaryObjectNoradId}`}
            passHref
            className="govuk-link"
          >
            {renderValue()}
          </Link>
        ),
      },
      {
        accessorKey: 'secondaryObjectCommonName',
        header: 'Conjunctions.secondary',
        cell: ({ row, getValue }) => {
          const value = getValue<string>();
          if (value === 'UNKNOWN') {
            return value;
          } else {
            return isAnalysist(role)
              ? (
                  <Link
                    href={`/satellites/${row?.original.secondaryObjectNoradId}`}
                    passHref
                    className="govuk-link"
                  >
                    {value}
                  </Link>
                )
              : (
                  value
                );
          }
        },
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
          const collisionProbability = getValue<number>();
          if (!collisionProbability) {
            return '';
          }
          if (displayUnit === 'percentage') {
            return `${(collisionProbability * 100).toFixed(2)}%`;
          }
          return collisionProbability;
        },
      },
      {
        id: `collisionProbabilityUksa`,
        accessorKey: `additionalAnalysis`,
        header: 'UKSA',
        cell: ({ getValue }) => {
          const value = getValue<TypeAdditionalAnalysis>();
          const { collisionProbability } = value ?? {};

          if (collisionProbability) {
            if (displayUnit === 'percentage') {
              return `${(collisionProbability * 100).toFixed(2)}%`;
            }
            return collisionProbability;
          } else {
            return '';
          }
        },
      },
    ],
  },
];
