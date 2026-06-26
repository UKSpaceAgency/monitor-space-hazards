import Link from 'next/link';

import type { TypeActivityEvent, TypeActivityReasonForFlag } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import { renderReasonForFlagTag } from '@/utils/Tags';

export const activityFlagsColumns: TranslatedColumnDef<TypeActivityEvent>[] = [
  {
    id: 'event_information',
    header: 'Organisation_activity_flags.event_information',
    enableSorting: false,
    columns: [
      {
        accessorKey: 'reason_for_flag',
        header: 'Organisation_activity_flags.reason_for_flag',
        enableSorting: false,
        cell: ({ getValue }) => renderReasonForFlagTag(getValue<TypeActivityReasonForFlag>()),
      },
      {
        accessorKey: 'short_id',
        header: 'Organisation_activity_flags.flag_id',
        enableSorting: false,
        cell: ({ getValue }) => (
          <Link href={`/activity/${getValue<string>()}`} className="govuk-link">
            {getValue<string>()}
          </Link>
        ),
      },
      {
        accessorKey: 'common_name',
        header: 'Organisation_activity_flags.satellite',
        enableSorting: false,
        cell: ({ row }) => (
          <Link href={`/satellites/${row.original.norad_id}`} className="govuk-link">
            {row.original.common_name}
          </Link>
        ),
      },
      {
        accessorKey: 'flag_date',
        header: 'Organisation_activity_flags.flag_date',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? dayjs(value).format(FORMAT_DATE_FULL_MONTH) : '-';
        },
      },
    ],
  },
];
