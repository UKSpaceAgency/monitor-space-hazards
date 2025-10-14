import Link from 'next/link';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

export const fragmentationsColumns: TranslatedColumnDef<TypeFragmentationEvent>[] = [
  {
    id: 'risk',
    accessorKey: 'risk',
    header: 'Fragmentations.risk',
    cell: ({ getValue }) => {
      const classes = {
        Low: 'govuk-tag--green',
        Medium: 'govuk-tag--yellow',
        High: 'govuk-tag--red',
      };
      const value = getValue<keyof typeof classes>();
      return value
        ? (
            <Tag className={classes[value]}>{value}</Tag>
          )
        : '';
    },
  },
  {
    id: 'eventInformation',
    header: 'Fragmentations.event_details',
    enableSorting: false,
    columns: [
      {
        id: 'short_id',
        accessorKey: 'short_id',
        header: 'Fragmentations.short_id',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <Link href={`/fragmentations/${value}`} className="govuk-link">
              <strong>{value}</strong>
            </Link>
          );
        },
      },
      {
        id: 'event_epoch',
        accessorKey: 'event_epoch',
        header: 'Fragmentations.time',
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return `${dayjs(value).format(FORMAT_DATE_TIME)}`;
        },
      },
      {
        id: 'affected_regime',
        accessorKey: 'affected_regime',
        header: 'Fragmentations.affected_regime',
        cell: ({ getValue }) => getValue() ?? '-',
      },
    ],
  },
  {
    id: 'objectInformation',
    header: 'Fragmentations.object_details',
    enableSorting: false,
    columns: [
      {
        id: 'primary_object_common_name',
        accessorKey: 'primary_object_common_name',
        header: 'Fragmentations.primary_object_common_name',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'secondary_object_common_name',
        accessorKey: 'secondary_object_common_name',
        header: 'Fragmentations.secondary_object_common_name',
        cell: ({ getValue }) => getValue() ?? '-',
      },
    ],
  },
  {
    id: 'fragmentation_risk',
    header: 'Fragmentations.fragmentation_risk',
    enableSorting: false,
    columns: [
      {
        id: 'number_of_fragments',
        accessorKey: 'number_of_fragments',
        header: 'Fragmentations.number_of_fragments',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'modelled_fragments',
        accessorKey: 'modelled_fragments',
        header: 'Fragmentations.modelled_fragments',
        cell: ({ getValue }) => getValue() ?? '-',
      },
    ],
  },
];
