'use client';

import type { TypeActivityReportOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

const renderNumericCell = (value?: number | null) => (value ?? '-');

export const satellitePositionHistoryColumns: TranslatedColumnDef<TypeActivityReportOut>[] = [
  {
    id: 'empty',
    header: '',
    enableSorting: false,
    columns: [
      {
        id: 'latest_tle_epoch',
        accessorKey: 'latest_tle_epoch',
        header: 'Activities.date_of_tle',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return value ? dayjs(value).format(FORMAT_DATE_TIME) : '-';
        },
      },
    ],
  },
  {
    id: 'position_change',
    header: 'Activities.position_at_time',
    enableSorting: false,
    columns: [
      {
        id: 'inclination',
        accessorKey: 'inclination',
        header: 'Activities.inclination_short',
        enableSorting: false,
        cell: ({ getValue }) => renderNumericCell(getValue<number | null>()),
      },
      {
        id: 'apogee',
        accessorKey: 'apogee',
        header: 'Activities.apogee',
        enableSorting: false,
        cell: ({ getValue }) => renderNumericCell(getValue<number | null>()),
      },
      {
        id: 'perigee',
        accessorKey: 'perigee',
        header: 'Activities.perigee',
        enableSorting: false,
        cell: ({ getValue }) => renderNumericCell(getValue<number | null>()),
      },
      {
        id: 'longitude',
        accessorKey: 'longitude',
        header: 'Activities.longitude',
        enableSorting: false,
        cell: ({ getValue }) => renderNumericCell(getValue<number | null>()),
      },
    ],
  },
];
