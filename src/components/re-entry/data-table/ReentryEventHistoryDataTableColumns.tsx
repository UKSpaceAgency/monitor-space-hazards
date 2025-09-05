'use client';
import type { TypeTIPOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import ExpandedButton from '@/ui/button/expanded-button';

export const reentryEventHistoryColumns: TranslatedColumnDef<TypeTIPOut>[] = [
  {
    header: 'Reentry_event_history.data_source',
    id: 'dataSource',
    enableSorting: false,
    cell: ({ row }) => {
      const { source, externalId } = row.original;
      return row.getCanExpand()
        ? (
            <ExpandedButton
              isExpanded={row.getIsExpanded()}
              onClick={row.getToggleExpandedHandler()}
              aria-expanded={row.getIsExpanded()}
              aria-label="Find more information on the TIP"
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
    header: 'Reentry_event_history.time_of_update',
    accessorKey: 'updatedAt',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
  {
    header: 'Reentry_event_history.predicted_reentry_time',
    accessorKey: 'decayEpoch',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return dayjs(value).format(FORMAT_FULL_DATE_TIME);
    },
  },
  {
    header: 'Reentry_event_history.uncertainty_window',
    accessorKey: 'uncertaintyWindow',
    enableSorting: false,
  },
];
