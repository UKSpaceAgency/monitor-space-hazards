import dayjs from 'dayjs';

import type { TypeExternalDataPerformanceOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const dataPerformanceColumns: TranslatedColumnDef<TypeExternalDataPerformanceOut>[] = [
  {
    accessorKey: 'sourceProvider',
    id: 'sourceProvider',
    size: 100,
    header: 'Performance_monitoring.data_performance.source',
    enableSorting: false,
  },
  {
    accessorKey: 'sourceType',
    id: 'sourceType',
    size: 100,
    header: 'Performance_monitoring.data_performance.type_of_source',
    enableSorting: false,
  },
  {
    accessorKey: 'ingestionStart',
    id: 'ingestionStart',
    header: 'Performance_monitoring.data_performance.ingestion_start',
    cell: ({ getValue }) => {
      const date = getValue<Date>();

      return date ? dayjs(date).format(FORMAT_DATE_TIME) : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ingestionEnd',
    id: 'ingestionEnd',
    header: 'Performance_monitoring.data_performance.ingestion_stop',
    cell: ({ getValue }) => {
      const date = getValue<Date>();

      return date ? dayjs(date).format(FORMAT_DATE_TIME) : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'itemsFetched',
    id: 'itemsFetched',
    header: 'Performance_monitoring.data_performance.number_of_items_fetched',
    enableSorting: false,
  },
];
