'use client';
import { useQueryClient } from '@tanstack/react-query';
import saveAs from 'file-saver';
import { useTranslations } from 'next-intl';
import { type SyntheticEvent, useCallback, useState } from 'react';

import type { TypeEphemerisOut, TypeGetEphemerisParams } from '@/__generated__/data-contracts';
import { deleteEphemeris } from '@/actions/deleteEphemeris';
import { getEphemeris } from '@/actions/getEphemeris';
import { getEphemerises } from '@/actions/getEphemerises';
import InfiniteTable from '@/components/InfiniteTable';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { createJSON } from '@/libs/File';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getEphemerisDataTableColumns } from './columns';

type EphemerisDataTableProps = {
  data: TypeEphemerisOut[];
  params: TypeGetEphemerisParams;
};

const EphemerisDataTable = ({ data, params }: EphemerisDataTableProps) => {
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

      const { data } = await getEphemeris(id);

      if (!data) {
        return;
      }

      const blob = createJSON(data);
      saveAs(blob, `${id}.json`);
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
      await deleteEphemeris(fileToDelete);
      // We need to clear cache in InfiniteTable
      await queryClient.resetQueries({
        queryKey: [QUERY_KEYS.Ephemerises],
      });

      setFileDeleted(true);
    } catch {
      setFileDeleted(false);
    }
  }, [fileToDelete, queryClient]);

  const cancel = () => {
    setFile(null);
  };

  const columns = getEphemerisDataTableColumns({
    handleDelete,
    handleDownload,
    json: tCommon('json'),
    del: tCommon('delete'),
    deleted: tCommon('deleted'),
  });

  return (
    <>
      {fileToDelete && !isFileDeleted && (
        <TopNotificationBanner status="error" heading={tCommon('are_you_sure_you_want_to_delete_json', { fileToDelete })}>
          <div className="govuk-button-group">
            <Button className="govuk-button--warning" onClick={confirmDelete} aria-label={`Yes, delete ${fileToDelete}`}>
              {tCommon('yes_delete')}
            </Button>
            <Button className="govuk-button--secondary" onClick={cancel} aria-label={`Cancel, deleting ${fileToDelete}`}>
              {tCommon('cancel')}
            </Button>
          </div>
        </TopNotificationBanner>
      )}
      {fileToDelete && isFileDeleted && (
        <NotificationBanner status="success">
          {fileToDelete}
          {tCommon('json_has_been_deleted')}
        </NotificationBanner>
      )}
      <InfiniteTable<TypeEphemerisOut, TypeGetEphemerisParams>
        initialData={data}
        params={params}
        columns={columns}
        fetcher={getEphemerises}
        queryKeys={[QUERY_KEYS.Ephemerises]}
      />
    </>
  );
};

export { EphemerisDataTable };
