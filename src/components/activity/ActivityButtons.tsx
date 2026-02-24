'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ActivityButtonsProps = {
  title: string;
};

const ActivityButtons = ({ title }: ActivityButtonsProps) => {
  const tCommon = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={title} />
      <Button as="link" href="/activity" className="govuk-button--secondary" aria-label={tCommon('return', { to: 'track activity events' })}>
        {tCommon('return', { to: 'track activity events' })}
      </Button>
    </ButtonGroup>
  );
};

export { ActivityButtons };
