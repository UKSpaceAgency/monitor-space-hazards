import { usePDF } from '@react-pdf/renderer';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { generatePdfSections } from '@/libs/Pdf';
import { PdfTemplate } from '@/templates/Pdf';
import Button from '@/ui/button/button';

const PdfDownloadButton = ({ title }: { title: string }) => {
  const tCommon = useTranslations('Common');
  const [instance, update] = usePDF({ document: <PdfTemplate title={title} sections={[]} /> });

  useEffect(() => {
    update(<PdfTemplate title={title} sections={generatePdfSections()} />);
    const updateInterval = setInterval(() => {
      update(<PdfTemplate title={title} sections={generatePdfSections()} />);
    }, 5000);
    return () => clearInterval(updateInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  if (!instance.url) {
    return null;
  }

  return (
    <Link href={instance.url} target="_blank">
      <Button>
        {tCommon('download_event_as', { as: 'PDF' })}
      </Button>
    </Link>
  );
};

export { PdfDownloadButton };
