'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ReentryAlertButtonsProps = {
  pdfTitle: string;
};

const ReentryAlertButtons = ({ pdfTitle }: ReentryAlertButtonsProps) => {
  const t = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={pdfTitle} />
      <Link href="/re-entries">
        <Button variant="secondary">{t('return', { to: 'upcoming re-entry events page' })}</Button>
      </Link>
    </ButtonGroup>
  );
};

export { ReentryAlertButtons };
