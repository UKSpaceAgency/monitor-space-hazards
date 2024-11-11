'use client';
import { useQueryClient } from '@tanstack/react-query';
import saveAs from 'file-saver';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type SyntheticEvent, useCallback, useState } from 'react';

import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { deleteAnalysesAnalysisId } from '@/actions/deleteAnalysesAnalysisId';
import { getAnalyses } from '@/actions/getAnalyses';
import { getAnalysesAnalysisId } from '@/actions/getAnalysisId';
import InfiniteTable from '@/components/InfiniteTable';
import { formatDateTime } from '@/libs/Date';
import { createJSON } from '@/libs/File';
import type { TranslatedColumnDef } from '@/types';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Tag from '@/ui/tag/tag';
import { QUERY_KEYS } from '@/utils/QueryKeys';

type AnalysisDataTableProps = {
  data: TypeAnalysisOut[];
  params: TypeGetAnalysesParams;
};

const AnalysisDataTable = ({ data, params }: AnalysisDataTableProps) => {
  const tCommon = useTranslations('Common');
  const queryClient = useQueryClient();

  const [fileToDelete, setFile] = useState<string | null>(null);
  const [isFileDeleted, setFileDeleted] = useState(false);

  const handleDownload = useCallback(
    async (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;

      if (!id) {
        return;
      }

      const { data } = await getAnalysesAnalysisId(id);

      if (!data) {
        return;
      }

      const blob = createJSON(data);
      saveAs(blob, `${id}.json`);

      // gaEvent({
      //   action: "download",
      //   format: "json",
      //   page_path: router.pathname,
      //   table_name: "analyses"
      // })
    },
    [],
  );

  const handleDelete = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;

    if (!id) {
      return;
    }

    setFileDeleted(false);
    setFile(id);
  };

  const confirmDelete = useCallback(async () => {
    if (!fileToDelete) {
      return;
    }

    try {
      await deleteAnalysesAnalysisId(fileToDelete);
      // We need to clear cache in InfiniteTable
      await queryClient.resetQueries({
        queryKey: [QUERY_KEYS.Analyses],
      });

      setFileDeleted(true);
    } catch {
      setFileDeleted(false);
    }
  }, [fileToDelete, queryClient]);

  const cancel = () => {
    setFile(null);
  };

  const columns: TranslatedColumnDef<TypeAnalysisOut>[] = [
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'AnalysisData.date',
      cell: ({ getValue }) => formatDateTime(getValue() as string),
      size: 150,
    },
    {
      id: 'uploadedByEmail',
      accessorKey: 'uploadedByEmail',
      header: 'AnalysisData.user_email',
      size: 300,
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
      size: 150,
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
            {tCommon('json')}
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
                  Delete
                  <span className="govuk-visually-hidden">
                    analysis for
                    {row?.original?.eventShortId}
                  </span>
                </Link>
              </div>
            )
          : (
              <Tag className="govuk-tag--red">Deleted</Tag>
            );
      },
    },
  ];

  return (
    <>
      {fileToDelete && !isFileDeleted && (
        <NotificationBanner status="error" heading={tCommon('areYouSureYouWantToDeleteJson', { fileToDelete })}>
          <div className="govuk-button-group">
            <Button className="govuk-button--warning" onClick={confirmDelete}>
              {tCommon('yesDelete')}
            </Button>
            <Button className="govuk-button--secondary" onClick={cancel}>
              {tCommon('cancel')}
            </Button>
          </div>
        </NotificationBanner>
      )}
      {fileToDelete && isFileDeleted && (
        <NotificationBanner status="success">
          {fileToDelete}
          {tCommon('jsonHasBeenDeleted')}
        </NotificationBanner>
      )}
      <InfiniteTable<TypeAnalysisOut, TypeGetAnalysesParams>
        initialData={data}
        params={params}
        columns={columns}
        fetcher={getAnalyses}
        queryKeys={[QUERY_KEYS.Analyses]}
      />
    </>
  );
};

export { AnalysisDataTable };
