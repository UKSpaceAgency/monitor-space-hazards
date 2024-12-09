'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { generatePdf } from '@/libs/Pdf/Pdf';
import Button from '@/ui/button/button';

type ReentryButtonsProps = {
  title: string;
};

const ReentryButtons = ({ title }: ReentryButtonsProps) => {
  const tCommon = useTranslations('Common');

  const pathname = usePathname();

  const handleDownloadPdf = () => {
    generatePdf(title, pathname);
  };

  return (
    <div className="govuk-button-group">
      <Button onClick={handleDownloadPdf}>
        {tCommon('download_event_as', { as: 'PDF' })}
      </Button>

      <Link
        href="/re-entries"
        passHref
        legacyBehavior
      >
        <Button className="govuk-button--secondary">
          {tCommon('return', { to: 'previous page' })}
        </Button>
      </Link>
    </div>
  );
};

export { ReentryButtons };
