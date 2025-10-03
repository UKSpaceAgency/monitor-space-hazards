import Link from 'next/link';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

export const fragmentationsColumns: TranslatedColumnDef<TypeFragmentationEvent>[] = [
  {
    id: 'eventInformation',
    header: 'Fragmentations.event_details',
    enableSorting: false,
    columns: [
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
      {
        id: 'known_fragments',
        accessorKey: 'known_fragments',
        header: 'Fragmentations.known_fragments',
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
        header: 'Fragmentations.object',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'primary_object_type',
        accessorKey: 'primary_object_type',
        header: 'Fragmentations.object_type',
        cell: ({ getValue }) => getValue() ?? '-',
      },
      {
        id: 'primary_object_licensing_country',
        accessorKey: 'primary_object_licensing_country',
        header: 'Fragmentations.licensing_country',
        cell: ({ getValue }) => getValue() ?? '-',
      },
    ],
  },
];
