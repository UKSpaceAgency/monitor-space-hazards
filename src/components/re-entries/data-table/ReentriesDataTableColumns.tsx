import { isNumber } from 'lodash';
import Link from 'next/link';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedFixed } from '@/utils/Math';

export const reentriesColumns = (haveAccessToAlerts?: boolean): TranslatedColumnDef<TypeReentryEventOut>[] => [
  {
    id: 'uk_reentry_probability',
    accessorKey: 'fragmentsRisk',
    header: 'Reentries.table.risk',
    size: 100,
    cell: ({ getValue }) => {
      const classes = {
        Low: 'govuk-tag--green',
        Medium: 'govuk-tag--yellow',
        High: 'govuk-tag--red',
      };
      const value = getValue<keyof typeof classes>();
      return value
        ? (
            <Tag className={classes[value]}>{value}</Tag>
          )
        : '';
    },
  },
  {
    id: 'shortId',
    accessorKey: 'shortId',
    header: 'Reentries.table.event_id',
    size: 100,
    cell: ({ getValue, row: { original: { reentryReportNumber } } }) => {
      const value = getValue<string>();

      const href = reentryReportNumber && reentryReportNumber > 0 && haveAccessToAlerts
        ? `/re-entries/${value}/alert`
        : `/re-entries/${value}`;

      return (
        <Link href={href} className="govuk-link">
          <strong>{value}</strong>
        </Link>
      );
    },
  },
  {
    id: 'objectName',
    accessorKey: 'objectName',
    header: 'Reentries.table.object',
    cell: ({ row: { original: { objectName, objectType } } }) => `${objectName} ${objectType ? `(${objectType})` : ''}`,
  },
  {
    id: 'noradId',
    accessorKey: 'noradId',
    header: 'Reentries.table.norad_id',
    size: 100,
  },
  {
    id: 'fragmentsProbability',
    accessorKey: 'fragmentsProbability',
    header: 'Reentries.table.probability_of_fragmentation',
    size: 70,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return isNumber(value) ? `${roundedFixed(value)}` : '-';
    },
  },
  {
    id: 'timeWindowStart',
    accessorKey: 'decayEpoch',
    header: 'Reentries.table.date',
    size: 150,
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_FULL_MONTH),
  },
  {
    id: 'time',
    enableSorting: false,
    accessorKey: 'decayEpoch',
    header: 'Reentries.table.time',
    size: 80,
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_TIME),
  },
  {
    id: 'uncertaintyWindow',
    enableSorting: false,
    accessorKey: 'uncertaintyWindow',
    header: 'Reentries.table.window',
    size: 70,
    cell: ({ getValue }) => `+/- ${getValue<number>()}`,
  },
];
