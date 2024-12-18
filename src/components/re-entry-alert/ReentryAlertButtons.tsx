'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { generatePdf } from '@/libs/Pdf/Pdf';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

type ReentryAlertButtonsProps = {
  pdfTitle: string;
};

const ReentryAlertButtons = ({ pdfTitle }: ReentryAlertButtonsProps) => {
  const t = useTranslations('Common');
  const pathname = usePathname();

  const handleDownloadPdf = () => {
    generatePdf(pdfTitle, pathname);
  };

  return (
    <ButtonGroup>
      <Button onClick={handleDownloadPdf}>
        {t('download_event_as', { as: 'PDF' })}
      </Button>

      <Link href="/re-entries">
        <Button variant="secondary">{t('return', { to: 'previous page' })}</Button>
      </Link>
    </ButtonGroup>
  );
};

export { ReentryAlertButtons };
