import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import type { TranslatedColumnDef } from '@/types';

export const analysesAndManoeuvreSupport: TranslatedColumnDef<AnalysisAndManoeuvreSupportStatsType>[] = [
  {
    accessorKey: 'source',
    id: 'source',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.source',
    enableSorting: false,
  },
  {
    accessorKey: 'month',
    id: 'month',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.date',
    enableSorting: false,
  },
  {
    accessorKey: 'analysesCount',
    id: 'analysesCount',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.numbers_of_analyses',
    enableSorting: false,
  },
  {
    accessorKey: 'manoeuvreSupportCount',
    id: 'manoeuvreSupportCount',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.numbers_of_manoeuvre',
    enableSorting: false,
  },
];
