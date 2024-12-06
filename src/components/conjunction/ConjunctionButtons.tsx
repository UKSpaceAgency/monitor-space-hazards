'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { createContent, generatePdf } from '@/libs/Pdf/Pdf';
import Button from '@/ui/button/button';

type ConjunctionButtonsProps = {
  title: string;
};

const ConjunctionButtons = ({ title }: ConjunctionButtonsProps) => {
  const tCommon = useTranslations('Common');

  const pathname = usePathname();

  const handleDownloadPdf = () => {
    const exportables = document.querySelectorAll('[data-pdf]');

    const stacks: any[] = [];

    exportables.forEach((exportable) => {
      if (exportable instanceof HTMLElement) {
        stacks.push({
          stack: createContent(exportable.dataset.pdf as string, exportable),
        });
      }
    });

    generatePdf(title, stacks, pathname);
  };

  return (
    <div className="govuk-button-group">
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
    </div>
  );
};

export { ConjunctionButtons };
