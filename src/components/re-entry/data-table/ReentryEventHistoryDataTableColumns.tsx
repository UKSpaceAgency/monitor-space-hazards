'use client';
import type { TypeTIPOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import ExpandedButton from '@/ui/button/expanded-button';

export const reentryEventHistoryColumns: TranslatedColumnDef<TypeTIPOut>[] = [
  {
    header: 'Reentry_event_history.data_source',
    id: 'data_source',
    enableSorting: false,
    cell: ({ row }) => {
      const { source, external_id } = row.original;
      return row.getCanExpand()
        ? (
            <ExpandedButton
              isExpanded={row.getIsExpanded()}
              onClick={row.getToggleExpandedHandler()}
              aria-expanded={row.getIsExpanded()}
              aria-label="Find more information on the TIP"
            >
              <span>
                {`${source} TIP: ID ${external_id}`}
              </span>
            </ExpandedButton>
          )
        : (
            `${source} TIP: ID ${external_id}`
          );
    },
  },
  {
    header: 'Reentry_event_history.time_of_update',
    accessorKey: 'updated_at',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Reentry_event_history.predicted_reentry_time',
    accessorKey: 'decay_epoch',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_FULL_DATE_TIME);
    },
  },
  {
    header: 'Reentry_event_history.uncertainty_window',
    accessorKey: 'uncertainty_window',
    enableSorting: false,
  },
];
