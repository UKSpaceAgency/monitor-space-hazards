import Link from 'next/link';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_FULL_MONTH, FORMAT_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

export const fragmentationsColumns: TranslatedColumnDef<TypeFragmentationEvent>[] = [
  {
    id: 'risk',
    enableSorting: false,
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
    id: 'primary_object_common_name',
    accessorKey: 'primary_object_common_name',
    header: 'Fragmentations.primary_object_common_name',
    cell: ({ getValue }) => getValue() ?? '-',
  },
  {
    id: 'secondary_object_common_name',
    enableSorting: false,
    accessorKey: 'secondary_object_common_name',
    header: 'Fragmentations.secondary_object_common_name',
    cell: ({ getValue }) => getValue() ?? '-',
  },
  {
    id: 'known_fragments',
    enableSorting: false,
    accessorKey: 'known_fragments',
    header: 'Fragmentations.number_of_fragments',
    cell: ({ getValue }) => getValue() ?? '-',
  },
  {
    id: 'modelled_fragments',
    enableSorting: false,
    accessorKey: 'modelled_fragments',
    header: 'Fragmentations.modelled_fragments',
    cell: ({ getValue }) => getValue() ?? '-',
  },
  {
    id: 'event_epoch',
    accessorKey: 'event_epoch',
    header: 'Fragmentations.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_FULL_MONTH),
  },
  {
    id: 'time',
    enableSorting: false,
    accessorKey: 'event_epoch',
    header: 'Fragmentations.time',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_TIME),
  },
];
