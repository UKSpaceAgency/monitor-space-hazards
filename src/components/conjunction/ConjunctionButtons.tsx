'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { generatePdf } from '@/libs/Pdf/Pdf';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

type ConjunctionButtonsProps = {
  title: string;
};

const ConjunctionButtons = ({ title }: ConjunctionButtonsProps) => {
  const tCommon = useTranslations('Common');

  const pathname = usePathname();

  const handleDownloadPdf = () => {
    generatePdf(title, pathname);
  };

  return (
    <ButtonGroup>
      <Link
        href="/conjunctions"
        passHref
        legacyBehavior
      >
        <Button className="govuk-button--secondary">
          {tCommon('return', { to: 'upcoming conjunction events page' })}
        </Button>
      </Link>

      <Button onClick={handleDownloadPdf}>
        {tCommon('download_event_as', { as: 'PDF' })}
      </Button>
    </ButtonGroup>
  );
};

export { ConjunctionButtons };
