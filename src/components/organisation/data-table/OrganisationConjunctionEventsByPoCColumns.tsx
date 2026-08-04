import type { EventsBySatelliteType } from '@/actions/getStatsEventsBySatellite';
import type { TranslatedColumnDef } from '@/types';

export type PocRow = EventsBySatelliteType & { total: number };

export const pocColumns: TranslatedColumnDef<PocRow>[] = [
  {
    accessorKey: 'name',
    id: 'satellite',
    header: 'Organisation_conjunction_poc.satellite',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Organisation_conjunction_poc.low',
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Organisation_conjunction_poc.medium',
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Organisation_conjunction_poc.high',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Organisation_conjunction_poc.total',
    enableSorting: false,
  },
];
