import type { EventsByOrganizationSectionType } from '@/actions/getStatsEventsByOrganization';
import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import type { TranslatedColumnDef } from '@/types';

export const conjunctionsBySatelliteColumns: TranslatedColumnDef<EventsBySatelliteType>[] = [
  {
    accessorKey: 'commonName',
    id: 'commonName',
    header: 'Performance_monitoring.conjunction_events_by_satellite.satellite_name',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Performance_monitoring.conjunction_events_by_satellite.low',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Performance_monitoring.conjunction_events_by_satellite.medium',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Performance_monitoring.conjunction_events_by_satellite.high',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
];
