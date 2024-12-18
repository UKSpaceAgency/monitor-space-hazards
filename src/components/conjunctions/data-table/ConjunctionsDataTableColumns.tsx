import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { getAbsoluteValue } from '@/utils/Math';

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
        id: 'shortId',
        accessorKey: 'shortId',
        header: 'Conjunctions.conjunction_event_id',
        cell: ({ getValue, row: { original: { reportNumber } } }) => {
          const value = getValue<string>();

          const href = reportNumber && reportNumber > 0 && isAnalyst
            ? `/conjunctions/${value}/alert`
            : `/conjunctions/${value}`;

          return (
            <Link href={href} className="govuk-link">
              <strong>{value}</strong>
            </Link>
          );
        },
      },
      {
        id: 'tcaTime',
        accessorKey: 'tcaTime',
        header: 'Conjunctions.time_of_closest_approach',
        cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
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
            className="govuk-link"
          >
            {getValue<string>()}
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
        cell: ({ getValue }) => {
          const radialMissDistance = getValue<number>();

          return getAbsoluteValue(radialMissDistance);
        },
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
        size: 200,
        cell: ({ getValue }) => {
          const collisionProbability = getValue<number>();
          if (!collisionProbability) {
            return '';
          }

          if (probabilityUnit === 'percentage') {
            return `${(collisionProbability * 100).toFixed(2)}%`;
          }
          return collisionProbability.toExponential(4);
        },
      },
      {
        id: 'collisionProbabilityUksa',
        accessorKey: 'additionalAnalysis',
        header: 'Conjunctions.uksa',
        cell: ({ getValue }) => {
          const value = getValue<{ collisionProbability: number }>();
          const { collisionProbability } = value ?? {};

          if (!collisionProbability) {
            return '';
          }

          if (probabilityUnit === 'percentage') {
            return `${(collisionProbability * 100).toFixed(2)}%`;
          }
          return collisionProbability.toExponential(4);
        },
      },
    ],
  },
];
