/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type SyntheticEvent, useCallback, useState } from 'react';

import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { deleteAnalysesAnalysisId } from '@/actions/deleteAnalysesAnalysisId';
import { getAnalyses } from '@/actions/getAnalyses';
import { getAnalysesAnalysisId } from '@/actions/getAnalysisId';
import InfiniteTable from '@/components/InfiniteTable';
import { formatDateTime } from '@/libs/Date';
import type { TranslatedColumnDef } from '@/types';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Tag from '@/ui/tag/tag';

type AnalysisDataTableProps = {
  data: TypeAnalysisOut[];
  params: TypeGetAnalysesParams;
};

const AnalysisDataTable = ({ data, params }: AnalysisDataTableProps) => {
  const tCommon = useTranslations('Common');

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

      const blob = new Blob([JSON.stringify(data)], {
        type: 'text/json',
      });
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
      const a = document.createElement('a');
      a.download = `${id}.json`;
      a.href = window.URL.createObjectURL(blob);
      const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      a.dispatchEvent(clickEvt);
      a.remove();
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

      setFileDeleted(true);
    } catch {
      setFileDeleted(false);
    }
  }, [fileToDelete]);

  const cancel = () => {
    setFile(null);
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
      id: 'id',
      accessorKey: 'id',
      header: 'AnalysisData.file_uploaded',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <a
            href="#"
            className="govuk-link"
            data-id={value}
            onClick={handleDownload}
          >
            {value}
            .json
          </a>
        );
      },
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
    <>
      {fileToDelete && !isFileDeleted && (
        <NotificationBanner status="error" heading={tCommon('areYouSureYouWantToDeleteJson', { fileToDelete })}>
          <div className="govuk-button-group">
            <Button element="button" className="govuk-button--warning" onClick={confirmDelete}>
              {tCommon('yesDelete')}
            </Button>
            <Button element="button" className="govuk-button--secondary" onClick={cancel}>
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
      />
    </>
  );
};

export { AnalysisDataTable };
