'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ConjunctionAlertPageButtonsProps = {
  pdfTitle: string;
};

const ConjunctionAlertPageButtons = ({ pdfTitle }: ConjunctionAlertPageButtonsProps) => {
  const t = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={pdfTitle} />
      <Link href="/conjunctions">
        <Button variant="secondary">{t('return', { to: 'track conjunction events' })}</Button>
      </Link>
    </ButtonGroup>
  );
};

export { ConjunctionAlertPageButtons };
