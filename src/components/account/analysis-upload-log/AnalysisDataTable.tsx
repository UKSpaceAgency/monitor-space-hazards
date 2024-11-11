'use client';
import Link from 'next/link';
import type { SyntheticEvent } from 'react';

import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { deleteAnalysesAnalysisId } from '@/actions/deleteAnalysesAnalysisId';
import { getAnalyses } from '@/actions/getAnalyses';
import InfiniteTable from '@/components/InfiniteTable';
import { formatDateTime } from '@/libs/Date';
import type { TranslatedColumnDef } from '@/types';
import Tag from '@/ui/tag/tag';

type AnalysisDataTableProps = {
  data: TypeAnalysisOut[];
  params: TypeGetAnalysesParams;
};

const AnalysisDataTable = ({ data, params }: AnalysisDataTableProps) => {
  const handleDelete = async (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;

    if (!id) {
      return;
    }

    await deleteAnalysesAnalysisId(id);
  };

  const columns: TranslatedColumnDef<TypeAnalysisOut>[] = [
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'AnalysisData.date',
      cell: ({ getValue }) => formatDateTime(getValue() as string),
    },
    {
      id: 'uploadedByEmail',
      accessorKey: 'uploadedByEmail',
      header: 'AnalysisData.user_email',
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
    },
    {
      id: 'eventId',
      accessorKey: 'eventId',
      header: 'AnalysisData.file_uploaded',
    },
    {
      id: 'Delete',
      accessorKey: 'isActive',
      header: 'isActive',
      enableSorting: false,
      cell: ({ getValue, row }) => {
        const value = getValue() as string;
        return value === null || value
          ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                href="#"
                className="govuk-link"
                data-id={row?.original.id}
                onClick={handleDelete}
              >
                Delete
                <span className="govuk-visually-hidden">
                  analysis for
                  {row?.original?.eventShortId}
                </span>
              </a>
            )
          : (
              <Tag className="govuk-tag--red">Deleted</Tag>
            );
      },
    },
  ];

  return (
    <InfiniteTable<TypeAnalysisOut, TypeGetAnalysesParams>
      initialData={data}
      params={params}
      columns={columns}
      fetcher={getAnalyses}
    />
  );
};

export { AnalysisDataTable };
