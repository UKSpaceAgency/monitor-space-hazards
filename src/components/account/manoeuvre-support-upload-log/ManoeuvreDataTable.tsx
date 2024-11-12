'use client';

import { useQueryClient } from '@tanstack/react-query';
import saveAs from 'file-saver';
import { useTranslations } from 'next-intl';
import type { SyntheticEvent } from 'react';
import { useCallback, useState } from 'react';

import type { TypeGetManoeuvrePlotsParams, TypeManoeuvrePlotWithUserMetadataOut } from '@/__generated__/data-contracts';
import { deleteManoeuvrePlotsManoeuvrePlotId } from '@/actions/deleteManoeuvrePlotsManoeuvrePlotId';
import { getManoeuvrePlots } from '@/actions/getManoeuvrePlots';
import { getManoeuvrePlotsManoeuvrePlotId } from '@/actions/getManoeuvrePlotsManoeuvrePlotId';
import InfiniteTable from '@/components/InfiniteTable';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { createJSON } from '@/libs/File';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { QUERY_KEYS } from '@/utils/QueryKeys';

import { getManoeuvreDataTableColumns } from './columns';

type ManoeuvreDataTableProps = {
  data: TypeManoeuvrePlotWithUserMetadataOut[];
  params: TypeGetManoeuvrePlotsParams;
};

const ManoeuvreDataTable = ({ data, params }: ManoeuvreDataTableProps) => {
  const tCommon = useTranslations('Common');
  const queryClient = useQueryClient();

  const [fileToDelete, setFile] = useState<string | null>(null);
  const [isFileDeleted, setFileDeleted] = useState(false);

  const confirmDelete = useCallback(async () => {
    if (!fileToDelete) {
      return;
    }

    try {
      await deleteManoeuvrePlotsManoeuvrePlotId(fileToDelete);

      await queryClient.resetQueries({
        queryKey: [QUERY_KEYS.Manoeuvres],
      });

      setFileDeleted(true);
    } catch {
      setFileDeleted(false);
    }
  }, [fileToDelete, queryClient]);

  const cancel = () => {
    setFile(null);
  };

  const handleDownload = useCallback(
    async (e: SyntheticEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;

      if (!id) {
        return;
      }

      const { data } = await getManoeuvrePlotsManoeuvrePlotId(id);

      if (!data) {
        return;
      }

      const blob = createJSON(data);
      saveAs(blob, `${id}.json`);

      // gaEvent({
      //   action: 'download',
      //   format: 'json',
      //   page_path: router.pathname,
      //   table_name: 'mtp',
      // });
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

  const columns = getManoeuvreDataTableColumns({
    handleDownload,
    handleDelete,
    json: tCommon('json'),
    del: tCommon('delete'),
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
      <InfiniteTable<TypeManoeuvrePlotWithUserMetadataOut, TypeGetManoeuvrePlotsParams>
        initialData={data}
        params={params}
        columns={columns}
        fetcher={getManoeuvrePlots}
        queryKeys={[QUERY_KEYS.Manoeuvres]}
      />
    </>
  );
};

export { ManoeuvreDataTable };
