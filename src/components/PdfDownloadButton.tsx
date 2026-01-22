'use client';

import { usePDF } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { generatePdfSections } from '@/libs/Pdf';
import { PdfTemplate } from '@/templates/PdfTemplate';
import Button from '@/ui/button/button';

const PdfDownloadButton = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const tCommon = useTranslations('Common');
  const [downloading, setDownloading] = useState(false);
  const [instance, update] = usePDF({ document: <PdfTemplate title={title} subtitle={subtitle} sections={[]} /> });

  const handleDownload = () => {
    setDownloading(true);
    update(<PdfTemplate title={title} subtitle={subtitle} sections={generatePdfSections()} />);
  };

  useEffect(() => {
    if (downloading && !instance.loading && instance.blob) {
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = URL.createObjectURL(instance.blob);
      link.download = title;

      // It needs to be added to the DOM so it can be clicked
      document.body.appendChild(link);
      link.click();

      // To make this work on Firefox we need to wait
      // a little while before removing it.
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 0);
      setDownloading(false);
    }
  }, [instance, downloading, title]);

  if (!instance.url) {
    return null;
  }

  return (
    <Button onClick={handleDownload} disabled={downloading} aria-label={`${tCommon('download_event_as', { as: 'PDF' })} - ${title}`}>
      {tCommon('download_event_as', { as: 'PDF' })}
    </Button>
  );
};

export { PdfDownloadButton };
