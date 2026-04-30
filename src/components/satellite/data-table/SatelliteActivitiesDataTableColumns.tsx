'use client';

import Link from 'next/link';

import type { TypeActivityEvent, TypeActivityReasonForFlag } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { renderReasonForFlagTag } from '@/utils/Tags';

export const satteliteActivityEventsColumns: TranslatedColumnDef<TypeActivityEvent>[] = [
  {
    header: 'Activities.event_information',
    columns: [
      {
        accessorKey: 'reason_for_flag',
        header: 'Activities.reason_for_flag',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<TypeActivityReasonForFlag>();
          return renderReasonForFlagTag(value);
        },
      },
      {
        accessorKey: 'short_id',
        header: 'Activities.short_id',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <Link
              href={`/activity/${value}`}
              className="govuk-link"
            >
              {value}
            </Link>
          );
        },
      },
      {
        accessorKey: 'flag_date',
        header: 'Activities.flag_date',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? dayjs(value).format(FORMAT_DATE_FULL_MONTH) : '-';
        },
      },
    ],
  },
  {
    header: 'Activities.position_change',
    columns: [
      {
        accessorKey: 'inclination',
        header: 'Activities.inclination',
        enableSorting: false,
      },
      {
        accessorKey: 'apogee',
        header: 'Activities.apogee',
        enableSorting: false,
      },
      {
        accessorKey: 'perigee',
        header: 'Activities.perigee',
        enableSorting: false,
      },
      {
        accessorKey: 'longitude',
        header: 'Activities.longitude',
        enableSorting: false,
      },
    ],
  },
];
