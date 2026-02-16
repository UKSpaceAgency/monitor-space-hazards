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
      <Button as="link" aria-label={t('contact_analyst')} href={`/contact-analyst/reentries?id=${shortId}&callback=/re-entries/${shortId}/alert`}>{t('contact_analyst')}</Button>
    </div>
  );
};

export { ReentryAlertNextUpdate };
