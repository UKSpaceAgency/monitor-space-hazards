import type { EventsBySatelliteAndType } from '@/actions/getStatsEventsByTypeForOrg';
import type { TranslatedColumnDef } from '@/types';

export type EventsByTypeRow = EventsBySatelliteAndType;

export const eventsByTypeColumns: TranslatedColumnDef<EventsByTypeRow>[] = [
  {
    accessorKey: 'name',
    id: 'satellite',
    header: 'Organisation_conjunction_type.satellite',
    enableSorting: false,
  },
  {
    accessorKey: 'debris',
    id: 'debris',
    header: 'Organisation_conjunction_type.debris',
    enableSorting: false,
  },
  {
    accessorKey: 'anotherSatellite',
    id: 'another_satellite',
    header: 'Organisation_conjunction_type.another_satellite',
    enableSorting: false,
  },
  {
    accessorKey: 'ukSatellites',
    id: 'uk_satellites',
    header: 'Organisation_conjunction_type.uk_satellites',
    enableSorting: false,
  },
  {
    accessorKey: 'other',
    id: 'other',
    header: 'Organisation_conjunction_type.other',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Organisation_conjunction_type.total',
    enableSorting: false,
  },
];
