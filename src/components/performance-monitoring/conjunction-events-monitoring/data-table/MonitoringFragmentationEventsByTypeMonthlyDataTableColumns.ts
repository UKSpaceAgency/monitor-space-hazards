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
    accessorKey: 'ACCIDENTAL',
    id: 'ACCIDENTAL',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.accidental',
    enableSorting: false,
  },
  {
    accessorKey: 'AERODYNAMICS',
    id: 'AERODYNAMICS',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.aerodynamics',
    enableSorting: false,
  },
  {
    accessorKey: 'ANOMALOUS',
    id: 'ANOMALOUS',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.anomalous',
    enableSorting: false,
  },
  {
    accessorKey: 'COLLISION',
    id: 'COLLISION',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.collision',
    enableSorting: false,
  },
  {
    accessorKey: 'DELIBERATE',
    id: 'DELIBERATE',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.deliberate',
    enableSorting: false,
  },
  {
    accessorKey: 'ELECTRICAL',
    id: 'ELECTRICAL',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.electrical',
    enableSorting: false,
  },
  {
    accessorKey: 'EXPLOSION',
    id: 'EXPLOSION',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.explosion',
    enableSorting: false,
  },
  {
    accessorKey: 'PROPULSION',
    id: 'PROPULSION',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.propulsion',
    enableSorting: false,
  },
  {
    accessorKey: 'SMALL_IMPACTOR',
    id: 'SMALL_IMPACTOR',
    header: 'Performance_monitoring.fragmentation_events_by_type_monthly.small_impactor',
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
    cell: ({ row }) => row.original.ACCIDENTAL + row.original.AERODYNAMICS + row.original.ANOMALOUS + row.original.COLLISION + row.original.DELIBERATE + row.original.ELECTRICAL + row.original.EXPLOSION + row.original.PROPULSION + row.original.SMALL_IMPACTOR + row.original.UNKNOWN,
  },
];
