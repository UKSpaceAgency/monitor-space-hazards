'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ReentryButtonsProps = {
  title: string;
};

const ReentryButtons = ({ title }: ReentryButtonsProps) => {
  const tCommon = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={title} />
      <Button as="link" href="/re-entries" className="govuk-button--secondary">
        {tCommon('return', { to: 'track re-entry events' })}
      </Button>
    </ButtonGroup>
  );
};

export { ReentryButtons };
