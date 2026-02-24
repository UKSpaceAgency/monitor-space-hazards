import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';

type ConjunctionAlertNextUpdateProps = {
  shortId: string;
};

const ConjunctionAlertNextUpdate = ({ shortId }: ConjunctionAlertNextUpdateProps) => {
  const t = useTranslations('Reentry_alert.Next_update');
  return (
    <div>
      <h3 className="govuk-heading-m">{t('title')}</h3>
      <p className="govuk-body">{t('content')}</p>
      <Button as="link" aria-label={t('contact_analyst')} href={`/contact-analyst/conjunctions?id=${shortId}&callback=/conjunction/${shortId}/alert`}>{t('contact_analyst')}</Button>
    </div>
  );
};

export { ConjunctionAlertNextUpdate };
