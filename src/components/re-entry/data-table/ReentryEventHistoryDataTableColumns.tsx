'use client';
import type { TypeTIPOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import ExpandedButton from '@/ui/button/expanded-button';

export const reentryEventHistoryColumns: TranslatedColumnDef<TypeTIPOut>[] = [
  {
    header: 'ReentryEventHistory.data_source',
    id: 'dataSource',
    enableSorting: false,
    cell: ({ row }) => {
      const { source, externalId } = row.original;
      return row.getCanExpand()
        ? (
            <ExpandedButton
              isExpanded={row.getIsExpanded()}
              onClick={row.getToggleExpandedHandler()}
            >
              <span>
                {`${source} TIP: ID ${externalId}`}
              </span>
            </ExpandedButton>
          )
        : (
            `${source} TIP: ID ${externalId}`
          );
    },
  },
  {
    header: 'ReentryEventHistory.time_of_update',
    accessorKey: 'updatedAt',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'ReentryEventHistory.predicted_reentry_time',
    accessorKey: 'decayEpoch',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'ReentryEventHistory.uncertainty_window',
    accessorKey: 'uncertaintyWindow',
    enableSorting: false,
  },
];
