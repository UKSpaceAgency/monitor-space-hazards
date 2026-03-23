import Link from 'next/link';
import type { SyntheticEvent } from 'react';

import type { TypeEphemerisOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

type EphemerisDataTableColumnsProps = {
  handleDownload: (e: SyntheticEvent<HTMLAnchorElement>) => Promise<void>;
  handleDelete: (e: SyntheticEvent<HTMLAnchorElement>) => void;
  json: string;
  del: string;
  deleted: string;
};

export const getEphemerisDataTableColumns = ({ handleDelete, handleDownload, json, del, deleted }: EphemerisDataTableColumnsProps): TranslatedColumnDef<TypeEphemerisOut>[] => [
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: 'Ephemeris_data.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
    size: 150,
  },
  {
    id: 'uploaded_by_email',
    accessorKey: 'uploaded_by_email',
    header: 'Ephemeris_data.user_email',
    size: 350,
  },
  {
    id: 'object_name',
    accessorKey: 'object_name',
    header: 'Ephemeris_data.satellite',
    cell: ({ row: { original: { object_name, satellite } } }) => {
      return (
        <Link href={`/satellites/${satellite}`} className="govuk-link">
          {object_name}
          {' '}
          (
          {satellite}
          )
        </Link>
      );
    },
    size: 200,
  },
  {
    id: 'uploaded_by_id',
    accessorKey: 'id',
    header: 'Ephemeris_data.file_uploaded',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Link
          href="#"
          className="govuk-link"
          data-id={value}
          onClick={handleDownload}
        >
          {value}
          {json}
        </Link>
      );
    },
    size: 300,
  },
  {
    id: 'is_active',
    accessorKey: 'is_active',
    enableSorting: false,
    header: () => <span className="invisible">Action</span>,
    cell: ({ getValue, row }) => {
      const value = getValue<string>();
      return value === null || value
        ? (
            <div className="text-right mr-2">
              <Link
                href="#"
                className="govuk-link"
                data-id={row?.original.id}
                onClick={handleDelete}
              >
                {del}
                <span className="govuk-visually-hidden">
                  analysis for
                  {row?.original?.satellite}
                </span>
              </Link>
            </div>
          )
        : (
            <Tag className="govuk-tag--red">{deleted}</Tag>
          );
    },
  },
];
