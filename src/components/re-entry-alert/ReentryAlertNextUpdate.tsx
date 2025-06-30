import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';

type ReentryAlertNextUpdateProps = {
  shortId: string;
};

const ReentryAlertNextUpdate = ({ shortId }: ReentryAlertNextUpdateProps) => {
  const t = useTranslations('Reentry_alert.Next_update');
  return (
    <div>
      <h3 className="govuk-heading-m">{t('title')}</h3>
      <p className="govuk-body">{t('content')}</p>
      <Link href={`/contact-analyst?id=${shortId}&callback=/re-entries/${shortId}/alert`}><Button>{t('contact_analyst')}</Button></Link>
    </div>
  );
};

export { ReentryAlertNextUpdate };
