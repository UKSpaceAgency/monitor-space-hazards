import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import type { TranslatedColumnDef } from '@/types';

export const eventsBySatelliteColumns: TranslatedColumnDef<EventsBySatelliteType>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Performance_monitoring.conjunction_events_by_satellite.satellite_name',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Performance_monitoring.conjunction_events_by_satellite.low',
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Performance_monitoring.conjunction_events_by_satellite.medium',
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Performance_monitoring.conjunction_events_by_satellite.high',
    enableSorting: false,
  },
];
