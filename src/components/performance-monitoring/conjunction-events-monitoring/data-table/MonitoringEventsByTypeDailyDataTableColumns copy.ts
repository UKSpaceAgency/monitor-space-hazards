import type { TypeStatisticsEventsType } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const eventsByTypeDailyColumns: TranslatedColumnDef<TypeStatisticsEventsType>[] = [
  {
    accessorKey: 'event_type',
    id: 'event_type',
    header: 'Performance_monitoring.conjunction_events_by_type.type',
    enableSorting: false,
  },
  {
    accessorKey: 'count',
    id: 'count',
    header: 'Performance_monitoring.conjunction_events_by_type.conjunction_events',
    enableSorting: false,
  },
];
