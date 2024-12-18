import Link from 'next/link';
import type { SyntheticEvent } from 'react';

import type { TypeManoeuvrePlotWithUserMetadataOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';

type ManoeuvreTableColumnsProps = {
  handleDownload: (e: SyntheticEvent<HTMLAnchorElement>) => Promise<void>;
  handleDelete: (e: SyntheticEvent<HTMLAnchorElement>) => void;
  json: string;
  del: string;
};

export const getManoeuvreDataTableColumns = ({
  handleDelete,
  handleDownload,
  json,
  del,
}: ManoeuvreTableColumnsProps): TranslatedColumnDef<TypeManoeuvrePlotWithUserMetadataOut>[] => [
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Manoeuvre_data.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
    size: 150,
  },
  {
    id: 'uploadedByEmail',
    accessorKey: 'uploadedByEmail',
    header: 'Manoeuvre_data.user_email',
    size: 350,
  },
  {
    id: 'eventShortId',
    accessorKey: 'eventShortId',
    header: 'Manoeuvre_data.event_id',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <Link href={`/conjunctions/${value}`} className="govuk-link">
          {value}
        </Link>
      );
    },
    size: 200,
  },
  {
    id: 'uploadedById',
    accessorKey: 'id',
    header: 'Manoeuvre_data.file_uploaded',
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
    id: 'delete',
    accessorKey: 'delete',
    enableSorting: false,
    header: () => <span className="invisible">Action</span>,
    cell: ({ row }) => (
      <div className="text-right mr-2">
        <Link
          href="#"
          className="govuk-link"
          data-id={row?.original.id}
          onClick={handleDelete}
        >
          {del}
          <span className="govuk-visually-hidden">
            mtp for
            {row?.original?.eventShortId}
          </span>
        </Link>
      </div>
    ),
  },
];
