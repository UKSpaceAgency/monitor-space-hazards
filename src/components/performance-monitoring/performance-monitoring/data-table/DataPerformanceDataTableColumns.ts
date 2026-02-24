import dayjs from 'dayjs';

import type { TypeExternalDataPerformanceOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

export const dataPerformanceColumns: TranslatedColumnDef<TypeExternalDataPerformanceOut>[] = [
  {
    accessorKey: 'source_provider',
    id: 'source_provider',
    size: 100,
    header: 'Performance_monitoring.data_performance.source',
    enableSorting: false,
  },
  {
    accessorKey: 'source_type',
    id: 'source_type',
    size: 100,
    header: 'Performance_monitoring.data_performance.type_of_source',
    enableSorting: false,
  },
  {
    accessorKey: 'ingestion_start',
    id: 'ingestion_start',
    header: 'Performance_monitoring.data_performance.ingestion_start',
    cell: ({ getValue }) => {
      const date = getValue<Date>();

      return date ? dayjs(date).format(FORMAT_DATE_TIME) : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ingestion_end',
    id: 'ingestion_end',
    header: 'Performance_monitoring.data_performance.ingestion_stop',
    cell: ({ getValue }) => {
      const date = getValue<Date>();

      return date ? dayjs(date).format(FORMAT_DATE_TIME) : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'items_fetched',
    id: 'items_fetched',
    header: 'Performance_monitoring.data_performance.number_of_items_fetched',
    enableSorting: false,
  },
];
