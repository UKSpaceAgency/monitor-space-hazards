import Link from 'next/link';
import type { SyntheticEvent } from 'react';

import type { TypeAnalysisOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

type AnalysisDataTableColumnsProps = {
  handleDownload: (e: SyntheticEvent<HTMLAnchorElement>) => Promise<void>;
  handleDelete: (e: SyntheticEvent<HTMLAnchorElement>) => void;
  json: string;
  del: string;
  deleted: string;
};

export const getAnalysisDataTableColumns = ({ handleDelete, handleDownload, json, del, deleted }: AnalysisDataTableColumnsProps): TranslatedColumnDef<TypeAnalysisOut>[] => [
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: 'Analysis_data.date',
    cell: ({ getValue }) => dayjs(getValue<string>()).format(FORMAT_DATE_TIME),
    size: 150,
  },
  {
    id: 'uploaded_by_email',
    accessorKey: 'uploaded_by_email',
    header: 'Analysis_data.user_email',
    size: 350,
  },
  {
    id: 'event_short_id',
    accessorKey: 'event_short_id',
    header: 'Analysis_data.event_id',
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
    header: 'Analysis_data.file_uploaded',
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
                  {row?.original?.event_short_id}
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
