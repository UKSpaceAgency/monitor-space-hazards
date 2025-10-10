'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

const PdfDownloadButton = dynamic(() => import('../PdfDownloadButton').then(mod => mod.PdfDownloadButton), {
  ssr: false,
});

type FragmentationButtonsProps = {
  title: string;
};

const FragmentationButtons = ({ title }: FragmentationButtonsProps) => {
  const tCommon = useTranslations('Common');

  return (
    <ButtonGroup>
      <PdfDownloadButton title={title} ariaLabel="Fragmentation Pdf download" />
      <Button as="link" href="/fragmentations" className="govuk-button--secondary" aria-label={tCommon('return', { to: 'track fragmentation events' })}>
        {tCommon('return', { to: 'track fragmentation events' })}
      </Button>
    </ButtonGroup>
  );
};

export { FragmentationButtons };
