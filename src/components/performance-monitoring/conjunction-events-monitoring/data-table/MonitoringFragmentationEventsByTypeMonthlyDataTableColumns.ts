'use client';
import type { StatsMonthlyFragmentationEventsByObjectType } from '@/actions/getStatsMonthlyFragmentationEventsByObjectType';
import type { TranslatedColumnDef } from '@/types';

export const fragmentationEventsByTypeMonthlyColumns: TranslatedColumnDef<StatsMonthlyFragmentationEventsByObjectType>[] = [
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.month',
    enableSorting: false,
  },
  {
    accessorKey: 'PAYLOAD',
    id: 'PAYLOAD',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.payload',
    enableSorting: false,
  },
  {
    accessorKey: 'ROCKET_BODY',
    id: 'ROCKET_BODY',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.rocket_body',
    enableSorting: false,
  },
  {
    accessorKey: 'DEBRIS',
    id: 'DEBRIS',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.debris',
    enableSorting: false,
  },
  {
    accessorKey: 'UNKNOWN',
    id: 'UNKNOWN',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.unknown',
    enableSorting: false,
  },
  {
    accessorKey: 'TOTAL',
    id: 'TOTAL',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.total',
    enableSorting: false,
    cell: ({ row }) => row.original.PAYLOAD + row.original.DEBRIS + row.original.ROCKET_BODY + row.original.UNKNOWN,
  },
];
