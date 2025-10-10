import { isNumber } from 'lodash';
import Link from 'next/link';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

export const reentriesColumns = (haveAccessToAlerts?: boolean): TranslatedColumnDef<TypeReentryEventOut>[] => [
  {
    id: 'eventInformation',
    header: 'Reentries.table.event_details',
    enableSorting: false,
    columns: [
      {
        id: 'uk_reentry_probability',
        accessorKey: 'fragmentsRisk',
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
        id: 'timeWindowStart',
        accessorKey: 'timeWindowStart',
        header: 'Reentries.table.re-entry_time_window',
        cell: ({ row: { original: { decayEpoch, uncertaintyWindow } } }) => {
          return `${dayjs(decayEpoch).format(FORMAT_FULL_DATE_TIME)} +/- ${uncertaintyWindow} minute(s)`;
        },
      },
      {
        id: 'overflightTime',
        accessorKey: 'overflightTime',
        header: 'Reentries.table.uk_overflight',
        cell: ({ getValue }) => {
          const [value] = getValue<string[]>();

          return value ? dayjs(value).format(FORMAT_FULL_DATE_TIME) : '-';
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
  {
    id: 'riskLikelihood',
    header: 'Reentries.table.risk_likelihood',
    enableSorting: false,
    columns: [
      {
        id: 'fragmentsProbability',
        accessorKey: 'fragmentsProbability',
        header: 'Reentries.table.probability_of_fragmentation',
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return isNumber(value) ? `${roundedPercentage(value)}` : '-';
        },
      },
      {
        id: 'atmosphericProbability',
        accessorKey: 'atmosphericProbability',
        header: 'Reentries.table.probability_of_atmospheric_entry',
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return isNumber(value) ? `${roundedPercentage(value)}` : '-';
        },
      },
      // {
      //   id: 'humanCasualtyProbability',
      //   accessorKey: 'humanCasualtyProbability',
      //   header: 'Reentries.table.probability_of_human_casualty',
      //   cell: ({ getValue }) => {
      //     const value = getValue<number>();
      //     return isNumber(value) ? `${roundedPercentage(value)}` : '-';
      //   },
      // },
    ],
  },
];
