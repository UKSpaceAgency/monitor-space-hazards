import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const uksaAnalysesDailyColumns: TranslatedColumnDef<AnalysisAndManoeuvreSupportStatsType>[] = [
  {
    accessorKey: 'sourceProvider',
    id: 'sourceProvider',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.source',
    enableSorting: false,
  },
  {
    accessorKey: 'date',
    id: 'date',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.date',
    cell: ({ getValue }) => {
      const date = getValue<string>();

      return dayjs(date).format(FORMAT_DATE);
    },
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
