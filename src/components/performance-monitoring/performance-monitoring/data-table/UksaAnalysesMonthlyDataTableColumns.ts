import type { StatsMonthlyAnalysesType } from '@/actions/getStatsMonthlyAnalyses';
import type { TranslatedColumnDef } from '@/types';

export const uksaAnalysesMonthlyColumns: TranslatedColumnDef<StatsMonthlyAnalysesType>[] = [
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support_monthly.month',
    enableSorting: false,
  },
  {
    accessorKey: 'analyses',
    id: 'analyses',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support_monthly.analyses',
    enableSorting: false,
  },
  {
    accessorKey: 'manoeuvreSupportPlots',
    id: 'manoeuvreSupportPlots',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support_monthly.manoeuvre_support_plots',
    enableSorting: false,
  },
];
