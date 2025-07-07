'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
      <Link
        href="/re-entries"
      >
        <Button className="govuk-button--secondary">
          {tCommon('return', { to: 'upcoming re-entry events page' })}
        </Button>
      </Link>
    </ButtonGroup>
  );
};

export { ReentryButtons };
