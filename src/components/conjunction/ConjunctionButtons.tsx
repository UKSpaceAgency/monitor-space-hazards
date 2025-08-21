'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type ConjunctionButtonsProps = {
  title: string;
};

const ConjunctionButtons = ({ title }: ConjunctionButtonsProps) => {
  const tCommon = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={title} />
      <Button as="link" href="/conjunctions" className="govuk-button--secondary">
        {tCommon('return', { to: 'track conjunction events' })}
      </Button>
    </ButtonGroup>
  );
};

export { ConjunctionButtons };
