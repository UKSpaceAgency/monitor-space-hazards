import { round } from 'lodash';
import Link from 'next/link';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { getFullCountry } from '@/utils/Regions';

export const reentriesColumns = (haveAccessToAlerts?: boolean): TranslatedColumnDef<TypeReentryEventOut>[] => [
  {
    id: 'eventInformation',
    accessorKey: 'eventInformation',
    header: 'Reentries.table.event_details',
    enableSorting: false,
    columns: [
      {
        id: 'uk_reentry_probability',
        accessorKey: 'ukReentryProbability',
        header: 'Reentries.table.risk',
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
        id: 'probability',
        accessorKey: 'probability',
        header: 'Reentries.table.probability_of_reentry',
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return value ? `${round(value * 100, 3)}%` : '-';
        },
      },
      {
        id: 'timeWindowStart',
        accessorKey: 'timeWindowStart',
        header: 'Reentries.table.re-entry_time_window',
        cell: ({ row: { original: { timeWindowStart, timeWindowEnd } } }) => {
          return `${dayjs(timeWindowStart).format(FORMAT_DATE_TIME)} to ${dayjs(timeWindowEnd).format(FORMAT_DATE_TIME)}`;
        },
      },
      {
        id: 'overflightTime',
        accessorKey: 'overflightTime',
        header: 'Reentries.table.uk_overflight',
        cell: ({ getValue }) => {
          const [value] = getValue<string[]>();

          return value ? dayjs(value).format(FORMAT_DATE_TIME) : '-';
        },
      },
    ],
  },
  {
    id: 'objectInformation',
    header: 'Reentries.table.object_details',
    enableSorting: false,
    columns: [
      {
        id: 'objectName',
        accessorKey: 'objectName',
        header: 'Reentries.table.object',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'survivability',
        accessorKey: 'survivability',
        header: 'Reentries.table.expected_survivability',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'licenseCountry',
        accessorKey: 'licenseCountry',
        header: 'Reentries.table.licensing_country',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? getFullCountry(value) : '-';
        },
      },
    ],
  },
];
