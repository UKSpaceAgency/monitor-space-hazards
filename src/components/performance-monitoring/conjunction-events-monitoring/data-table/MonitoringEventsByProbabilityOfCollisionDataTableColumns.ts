'use client';
import type { StatsMonthlyConjunctionEvent } from '@/actions/getStatsMonthlyConjunctionEvents';
import type { TranslatedColumnDef } from '@/types';

export const eventsByProbabilityOfCollisionColumns: TranslatedColumnDef<StatsMonthlyConjunctionEvent>[] = [
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.conjunction_events_by_probability_of_collision_monthly.month',
    enableSorting: false,
  },
  {
    accessorKey: 'low',
    id: 'low',
    header: 'Performance_monitoring.conjunction_events_by_probability_of_collision_monthly.low',
    enableSorting: false,
  },
  {
    accessorKey: 'medium',
    id: 'medium',
    header: 'Performance_monitoring.conjunction_events_by_probability_of_collision_monthly.medium',
    enableSorting: false,
  },
  {
    accessorKey: 'high',
    id: 'high',
    header: 'Performance_monitoring.conjunction_events_by_probability_of_collision_monthly.high',
    enableSorting: false,
  },
  {
    accessorKey: 'total',
    id: 'total',
    header: 'Performance_monitoring.conjunction_events_by_probability_of_collision_monthly.total',
    enableSorting: false,
    cell: ({ row }) => row.original.low + row.original.medium + row.original.high,
  },
];
