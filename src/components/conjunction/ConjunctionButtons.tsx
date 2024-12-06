'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';

const ConjunctionButtons = () => {
  const tCommon = useTranslations('Common');

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

      <Button>
        {tCommon('download_event_as', { as: 'PDF' })}
      </Button>
    </div>
  );
};

export { ConjunctionButtons };
