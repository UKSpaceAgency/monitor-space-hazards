'use client';

import Link from 'next/link';

import type { TypeActivityEventOut, TypeActivityReasonForFlag } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { renderReasonForFlagTag } from '@/utils/Tags';

export const activitiesColumns: TranslatedColumnDef<TypeActivityEventOut>[] = [
  {
    accessorKey: 'reason_for_flag',
    header: 'Activities.reason_for_flag',
    cell: ({ getValue }) => {
      const value = getValue<TypeActivityReasonForFlag>();
      return renderReasonForFlagTag(value);
    },
  },
  {
    accessorKey: 'short_id',
    header: 'Activities.short_id',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Link
          href={`/activities/${value}`}
          className="govuk-link"
        >
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: 'common_name',
    header: 'Activities.common_name',
    cell: ({ renderValue, row }) => (
      <Link
        href={`/satellites/${row?.original.norad_id}`}
        className="govuk-link"
      >
        {renderValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: 'operator_name',
    header: 'Activities.operator_name',
    cell: ({ getValue, row }) => {
      const value = getValue<string>();
      const operatorId = row.original.operator;
      return (
        <Link
          href={`/operators/${operatorId}`}
          className="govuk-link"
        >
          {value}
        </Link>
      );
    },
  },
  {
    accessorKey: 'norad_id',
    header: 'Activities.norad_id',
  },
  {
    accessorKey: 'flag_date',
    header: 'Activities.flag_date',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value ? dayjs(value).format(FORMAT_DATE_FULL_MONTH) : '-';
    },
  },
  {
    accessorKey: 'orbit_type',
    header: 'Activities.orbit_type',
  },
  {
    accessorKey: 'altitude',
    header: 'Activities.altitude',
  },
  {
    accessorKey: 'longitude',
    header: 'Activities.longitude',
  },
];
