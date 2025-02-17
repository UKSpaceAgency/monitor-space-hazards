'use client';
import type { StatsMonthlyConjunctionEventsByObjectType } from '@/actions/getStatsMonthlyConjunctionEventsByObjectType';
import type { TranslatedColumnDef } from '@/types';

export const eventsByTypeMonthlyColumns: TranslatedColumnDef<StatsMonthlyConjunctionEventsByObjectType>[] = [
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.month',
    enableSorting: false,
  },
  {
    accessorKey: 'DEBRIS',
    id: 'DEBRIS',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.debris',
    enableSorting: false,
  },
  {
    accessorKey: 'SATELLITE',
    id: 'SATELLITE',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.satellite',
    enableSorting: false,
  },
  {
    accessorKey: 'ROCKET_BODY',
    id: 'ROCKET_BODY',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.rocket_body',
    enableSorting: false,
  },
  {
    accessorKey: 'OTHER',
    id: 'OTHER',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.other',
    enableSorting: false,
  },
  {
    accessorKey: 'TOTAL',
    id: 'TOTAL',
    header: 'Performance_monitoring.conjunction_events_by_type_monthly.total',
    enableSorting: false,
    cell: ({ row }) => row.original.DEBRIS + row.original.SATELLITE + row.original.ROCKET_BODY + row.original.OTHER,
  },
];
