import dayjs from 'dayjs';
import Link from 'next/link';
import type { SyntheticEvent } from 'react';

import type { TypeAnalysisOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
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
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'AnalysisData.date',
    cell: ({ getValue }) => dayjs(getValue() as string).format(FORMAT_DATE_TIME),
    size: 150,
  },
  {
    id: 'uploadedByEmail',
    accessorKey: 'uploadedByEmail',
    header: 'AnalysisData.user_email',
    size: 350,
  },
  {
    id: 'eventShortId',
    accessorKey: 'eventShortId',
    header: 'AnalysisData.event_id',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <Link href={`/conjunctions/${value}`} passHref className="govuk-link">
          {value}
        </Link>
      );
    },
    size: 200,
  },
  {
    id: 'uploadedById',
    accessorKey: 'id',
    header: 'AnalysisData.file_uploaded',
    cell: ({ getValue }) => {
      const value = getValue() as string;
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
    id: 'isActive',
    accessorKey: 'isActive',
    enableSorting: false,
    header: () => <span className="invisible">Action</span>,
    cell: ({ getValue, row }) => {
      const value = getValue() as string;
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
                  {row?.original?.eventShortId}
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
