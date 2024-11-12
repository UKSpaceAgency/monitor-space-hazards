'use client';
import { useQueryClient } from '@tanstack/react-query';
import saveAs from 'file-saver';
import { useTranslations } from 'next-intl';
import { type SyntheticEvent, useCallback, useState } from 'react';

import type { TypeAnalysisOut, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { deleteAnalysesAnalysisId } from '@/actions/deleteAnalysesAnalysisId';
import { getAnalyses } from '@/actions/getAnalyses';
import { getAnalysesAnalysisId } from '@/actions/getAnalysisId';
import InfiniteTable from '@/components/InfiniteTable';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { createJSON } from '@/libs/File';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getAnalysisDataTableColumns } from './columns';

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

  const columns = getAnalysisDataTableColumns({
    handleDelete,
    handleDownload,
    json: tCommon('json'),
    del: tCommon('delete'),
    deleted: tCommon('deleted'),
  });

  return (
    <>
      {fileToDelete && !isFileDeleted && (
        <TopNotificationBanner status="error" heading={tCommon('areYouSureYouWantToDeleteJson', { fileToDelete })}>
          <div className="govuk-button-group">
            <Button className="govuk-button--warning" onClick={confirmDelete}>
              {tCommon('yesDelete')}
            </Button>
            <Button className="govuk-button--secondary" onClick={cancel}>
              {tCommon('cancel')}
            </Button>
          </div>
        </TopNotificationBanner>
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
