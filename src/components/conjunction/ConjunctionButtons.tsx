'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
      <Link
        href="/conjunctions"
      >
        <Button className="govuk-button--secondary">
          {tCommon('return', { to: 'upcoming conjunction events page' })}
        </Button>
      </Link>
      <PdfDownloadButton title={title} />
    </ButtonGroup>
  );
};

export { ConjunctionButtons };
