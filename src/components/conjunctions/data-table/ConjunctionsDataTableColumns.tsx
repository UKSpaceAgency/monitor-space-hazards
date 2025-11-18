import Link from 'next/link';

import type { TypeEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { displayExponential } from '@/utils/Math';

export type ProbabilityUnitType = 'scientific' | 'percentage';

type ConjunctionsDataTableColumns = {
  haveAccessToAlerts: boolean;
  isAnalyst: boolean;
  probabilityUnit: ProbabilityUnitType;
};

export const getConjunctionEventsColumns = ({
  haveAccessToAlerts,
  isAnalyst,
  probabilityUnit,
}: ConjunctionsDataTableColumns): TranslatedColumnDef<TypeEventOut>[] => [
  {
    id: 'userInterest',
    accessorKey: 'userInterest',
    header: 'Conjunctions.table.risk',
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
    header: 'Conjunctions.table.event_id',
    cell: ({ getValue, row: { original: { reportNumber } } }) => {
      const value = getValue<string>();

      const href = reportNumber && reportNumber > 0 && haveAccessToAlerts
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
    id: 'primaryObjectCommonName',
    accessorKey: 'primaryObjectCommonName',
    header: 'Conjunctions.table.primary_object',
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
    header: 'Conjunctions.table.secondary_object',
    cell: ({ row, getValue }) => {
      const value = getValue<string>();
      if (!value || value === 'UNKNOWN') {
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

      if (probabilityUnit === 'percentage') {
        return `${(collisionProbability * 100).toFixed(2)}%`;
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

      if (probabilityUnit === 'percentage') {
        return `${(collisionProbability * 100).toFixed(2)}%`;
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
