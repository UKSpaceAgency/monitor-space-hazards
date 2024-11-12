'use client';

import { saveAs } from 'file-saver';
import { snakeCase } from 'lodash';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { createCSV, createJSON } from '@/libs/File';
import Tooltip from '@/ui/tooltip/tooltip';

type DownloadDataProps = {
  type: string;
  downloadData: () => Promise<unknown>;
};

const DownloadData = ({ type, downloadData }: DownloadDataProps) => {
  const t = useTranslations('Tables.Download');
  const [fetching, setFetching] = useState(false);

  const handleDownload = async (format: 'json' | 'csv') => {
    const fileName = snakeCase(type);

    setFetching(true);

    const data = await downloadData();
    if (data) {
      const file
        = format === 'csv'
          ? createCSV(data)
          : createJSON(data);
      saveAs(file, `${fileName}.${format}`);
      // gaEvent({
      //   action: 'download',
      //   format,
      //   page_path: router.pathname,
      //   table_name: 'satellites',
      // });
    }
    setFetching(false);
  };

  return (
    <p className="govuk-body mt-6">
      {fetching
        ? 'Your download is being prepared'
        : (
            <>
              {t('text', { type })}
              {' '}
              [
              <Tooltip label={t('json')}><button type="button" className="govuk-link text-blue" onClick={() => handleDownload('json')}>JSON</button></Tooltip>
              ] [
              <Tooltip label={t('csv')}><button type="button" className="govuk-link text-blue" onClick={() => handleDownload('csv')}>CSV</button></Tooltip>
              ]
            </>
          )}
    </p>
  );
};

export { DownloadData };
