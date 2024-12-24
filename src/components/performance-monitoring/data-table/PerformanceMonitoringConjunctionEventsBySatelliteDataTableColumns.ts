import type { EventsByOrganizationSectionType } from '@/actions/getStatsEventsByOrganization';
import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import type { TranslatedColumnDef } from '@/types';

export const conjunctionsBySatelliteColumns: TranslatedColumnDef<EventsBySatelliteType>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Performance_monitoring.conjunction_events_by_satellite.satellite_name',
    enableSorting: false,
  },
  {
    accessorKey: 'less',
    id: 'less',
    header: 'Performance_monitoring.conjunction_events_by_satellite.less',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'between',
    id: 'between',
    header: 'Performance_monitoring.conjunction_events_by_satellite.between',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'more',
    id: 'more',
    header: 'Performance_monitoring.conjunction_events_by_satellite.more',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
];
