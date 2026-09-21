'use client';
import saveAs from 'file-saver';
import { Download04Icon, Loading03Icon } from 'hugeicons-react';
import { useState } from 'react';

import { getReentryReportDownload } from '@/actions/getReentryReportDownload';
import { createJSON } from '@/libs/File';

type ReentryReportDownloadButtonProps = {
  id: string;
  fileName: string;
  shortId: string;
  report: string;
};

const ReentryReportDownloadButton = ({ id, fileName, shortId, report }: ReentryReportDownloadButtonProps) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) {
      return;
    }
    setDownloading(true);
    try {
      const data = await getReentryReportDownload(id);
      if (data) {
        saveAs(createJSON(data), fileName);
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      className="govuk-link flex items-center gap-2 text-blue disabled:cursor-wait disabled:opacity-70"
      onClick={handleDownload}
      disabled={downloading}
      aria-busy={downloading}
      aria-label={downloading ? `Downloading ${shortId} ${report}` : `Download ${shortId} ${report}`}
    >
      {downloading ? <Loading03Icon className="animate-spin" /> : <Download04Icon />}
      <span className="text-left">
        {shortId}
        <br />
        {report}
      </span>
    </button>
  );
};

export { ReentryReportDownloadButton };
