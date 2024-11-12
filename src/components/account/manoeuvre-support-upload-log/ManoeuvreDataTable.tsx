/* eslint-disable no-console */
'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import type { TypeGetManoeuvrePlotsParams, TypeManoeuvrePlotWithUserMetadataOut } from '@/__generated__/data-contracts';
import { deleteManoeuvrePlotsManoeuvrePlotId } from '@/actions/deleteManoeuvrePlotsManoeuvrePlotId';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type ManoeuvreDataTableProps = {
  data: TypeManoeuvrePlotWithUserMetadataOut[];
  params: TypeGetManoeuvrePlotsParams;
};

const ManoeuvreDataTable = ({ data, params }: ManoeuvreDataTableProps) => {
  const tCommon = useTranslations('Common');

  console.log(data, params);

  const [fileToDelete, setFile] = useState<string | null>(null);
  const [isFileDeleted, setFileDeleted] = useState(false);

  const confirmDelete = useCallback(async () => {
    if (!fileToDelete) {
      return;
    }

    try {
      await deleteManoeuvrePlotsManoeuvrePlotId(fileToDelete);

      setFileDeleted(true);
    } catch {
      setFileDeleted(false);
    }
  }, [fileToDelete]);

  const cancel = () => {
    setFile(null);
  };

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
    </>
  );
};

export { ManoeuvreDataTable };
