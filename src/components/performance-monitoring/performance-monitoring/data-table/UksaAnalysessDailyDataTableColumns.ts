import type { AnalysisAndManoeuvreSupportStatsType } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { dayjs, FORMAT_DATE } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const uksaAnalysesDailyColumns: TranslatedColumnDef<AnalysisAndManoeuvreSupportStatsType>[] = [
  {
    accessorKey: 'source_provider',
    id: 'source_provider',
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
    accessorKey: 'analyses_count',
    id: 'analyses_count',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.numbers_of_analyses',
    enableSorting: false,
  },
  {
    accessorKey: 'manoeuvre_support_count',
    id: 'manoeuvre_support_count',
    header: 'Performance_monitoring.analyses_and_manoeuvre_support.numbers_of_manoeuvre',
    enableSorting: false,
  },
];
