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
    id: 'created_at',
    accessorKey: 'created_at',
    header: 'Manoeuvre_data.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
    size: 150,
  },
  {
    id: 'uploaded_by_email',
    accessorKey: 'uploaded_by_email',
    header: 'Manoeuvre_data.user_email',
    size: 350,
  },
  {
    id: 'event_short_id',
    accessorKey: 'event_short_id',
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
    id: 'uploaded_by_id',
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
            {row?.original?.event_short_id}
          </span>
        </Link>
      </div>
    ),
  },
];
