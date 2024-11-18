import dayjs from 'dayjs';
import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export type ProbabilityUnitType = 'scientific' | 'percentage';

type ConjunctionsDataTableColumns = {
  isAnalyst: boolean;
  probabilityUnit: ProbabilityUnitType;
};

export const getConjunctionEventsColumns = ({
  isAnalyst,
  probabilityUnit,
}: ConjunctionsDataTableColumns): TranslatedColumnDef<TypeEventOut>[] => [
  {
    id: 'baseData',
    accessorKey: 'baseData',
    header: 'Event information',
    enableSorting: false,
    columns: [
      {
        id: 'userInterest',
        accessorKey: 'userInterest',
        header: 'Conjunctions.event_information',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          if (value === 'High') {
            return (
              <strong className="govuk-tag govuk-tag--red">High</strong>
            );
          }
          return '';
        },
      },
      {
        id: 'shortId',
        accessorKey: 'shortId',
        header: 'Conjunctions.your_interest',
        cell: ({ getValue }) => {
          const value = getValue() as string;
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
        header: 'Conjunctions.time_of_closest_approach',
        cell: ({ getValue }) => dayjs(getValue() as string).format(FORMAT_DATE_TIME),
      },
    ],
  },
  {
    id: 'objects',
    header: 'Conjunctions.objects',
    enableSorting: false,
    columns: [
      {
        id: 'primaryObjectCommonName',
        accessorKey: 'primaryObjectCommonName',
        header: 'Conjunctions.primary',
        cell: ({ row, getValue }) => (
          <Link
            href={`/satellites/${row?.original.primaryObjectNoradId}`}
            passHref
            className="govuk-link"
          >
            {getValue() as string}
          </Link>
        ),
      },
      {
        id: 'secondaryObjectCommonName',
        accessorKey: 'secondaryObjectCommonName',
        header: 'Conjunctions.secondary',
        cell: ({ row, getValue }) => {
          const value = getValue();
          if (value === 'UNKNOWN') {
            return value;
          } else {
            return isAnalyst
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
    id: 'missDistance',
    header: 'Conjunctions.miss_distance',
    columns: [
      {
        id: 'radialMissDistance',
        accessorKey: 'radialMissDistance',
        header: 'Conjunctions.mean_radial',
      },
      {
        id: 'missDistance',
        accessorKey: 'missDistance',
        header: 'Conjunctions.total',
      },
    ],
  },
  {
    id: 'probabilityOfCollision',
    header: 'Conjunctions.probability_of_collision',
    columns: [
      {
        id: 'collisionProbability',
        accessorKey: 'collisionProbability',
        header: 'Conjunctions.space_track',
        cell: ({ getValue }) => {
          const collisionProbability = getValue();
          if (!collisionProbability) {
            return '';
          }

          if (probabilityUnit === 'percentage') {
            return `${(collisionProbability * 100).toFixed(2)}%`;
          }
          return collisionProbability;
        },
      },
      {
        id: 'collisionProbabilityUksa',
        accessorKey: 'additionalAnalysis',
        header: 'Conjunctions.uksa',
        cell: ({ getValue }) => {
          const value = getValue();
          const { collisionProbability } = value ?? {};

          if (!collisionProbability) {
            return '';
          }

          if (probabilityUnit === 'percentage') {
            return `${(collisionProbability * 100).toFixed(2)}%`;
          }
          return collisionProbability;
        },
      },
    ],
  },
];
