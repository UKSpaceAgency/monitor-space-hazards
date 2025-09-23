import type { TypeStatisticsReentryEventsAndAlertsCount } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const eventsByTypeDailyReentryMonitoringColumns: TranslatedColumnDef<TypeStatisticsReentryEventsAndAlertsCount>[] = [
  {
    accessorKey: 'objectType',
    id: 'objectType',
    header: 'Performance_monitoring.reentry_events_by_type.type',
    enableSorting: false,
  },
  {
    accessorKey: 'count',
    id: 'count',
    header: 'Performance_monitoring.reentry_events_by_type.reentry_events',
    enableSorting: false,
  },
];
