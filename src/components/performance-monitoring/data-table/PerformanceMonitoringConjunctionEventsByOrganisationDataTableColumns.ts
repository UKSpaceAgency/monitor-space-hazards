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
    accessorKey: 'less',
    id: 'less',
    header: 'Performance_monitoring.conjunction_events_by_organisation.less',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'between',
    id: 'between',
    header: 'Performance_monitoring.conjunction_events_by_organisation.between',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'more',
    id: 'more',
    header: 'Performance_monitoring.conjunction_events_by_organisation.more',
    cell: ({ getValue }) => {
      const { events } = getValue<EventsByOrganizationSectionType>();
      return events;
    },
    enableSorting: false,
  },
];
