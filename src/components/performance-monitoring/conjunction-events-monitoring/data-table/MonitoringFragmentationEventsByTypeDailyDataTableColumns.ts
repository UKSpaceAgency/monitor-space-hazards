import type { TypeStatisticsFragmentationEventsCountByFragmentationType } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

export const eventsByTypeDailyFragmentationMonitoringColumns: TranslatedColumnDef<TypeStatisticsFragmentationEventsCountByFragmentationType>[] = [
  {
    accessorKey: 'fragmentationType',
    id: 'fragmentationType',
    header: 'Performance_monitoring.fragmentation_events_by_type.fragmentation_type',
    enableSorting: false,
  },
  {
    accessorKey: 'count',
    id: 'count',
    header: 'Performance_monitoring.fragmentation_events_by_type.fragmentation_events',
    enableSorting: false,
  },
];
