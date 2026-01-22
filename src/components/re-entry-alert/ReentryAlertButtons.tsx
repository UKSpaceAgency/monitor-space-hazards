'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ReentryAlertButtonsProps = {
  pdfTitle: string;
  pdfSubtitle?: string;
};

const ReentryAlertButtons = ({ pdfTitle, pdfSubtitle }: ReentryAlertButtonsProps) => {
  const t = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={pdfTitle} subtitle={pdfSubtitle} />
      <Button as="link" href="/re-entries" variant="secondary" aria-label={t('return', { to: 'track re-entry events' })}>{t('return', { to: 'track re-entry events' })}</Button>
    </ButtonGroup>
  );
};

export { ReentryAlertButtons };
