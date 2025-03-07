'use client';

import { usePDF } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { generatePdfSections } from '@/libs/Pdf';
import { PdfTemplate } from '@/templates/PdfTemplate';
import Button from '@/ui/button/button';

const PdfDownloadButton = ({ title }: { title: string }) => {
  const tCommon = useTranslations('Common');
  const [downloading, setDownloading] = useState(false);
  const [instance, update] = usePDF({ document: <PdfTemplate title={title} sections={[]} /> });

  const handleDownload = () => {
    setDownloading(true);
    update(<PdfTemplate title={title} sections={generatePdfSections()} />);
  };

  useEffect(() => {
    if (downloading && !instance.loading && instance.url) {
      window.open(instance.url, '_blank');
      setDownloading(false);
    }
  }, [instance, downloading]);

  if (!instance.url) {
    return null;
  }

  return (
    <Button onClick={handleDownload} disabled={downloading}>
      {tCommon('download_event_as', { as: 'PDF' })}
    </Button>
  );
};

export { PdfDownloadButton };
