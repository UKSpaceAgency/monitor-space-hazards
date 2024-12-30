import type { EventsByOrganizationSectionType, EventsByOrganizationType } from '@/actions/getStatsEventsByOrganization';
import type { TranslatedColumnDef } from '@/types';

export const conjunctionsByOrganisationColumns: TranslatedColumnDef<EventsByOrganizationType>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Performance_monitoring.conjunction_events_by_organisation.type',
    enableSorting: false,
  },
  {
    accessorKey: 'totalEvents',
    id: 'totalEvents',
    header: 'Performance_monitoring.conjunction_events_by_organisation.conjunction_events',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Performance_monitoring.conjunction_events_by_organisation.low',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Performance_monitoring.conjunction_events_by_organisation.medium',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Performance_monitoring.conjunction_events_by_organisation.high',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
];
