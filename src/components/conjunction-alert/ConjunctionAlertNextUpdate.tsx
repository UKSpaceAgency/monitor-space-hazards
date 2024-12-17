import Link from 'next/link';
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
      <Link href={`/contact-analyst?id=${shortId}&callback=/conjunction/${shortId}/alert`}><Button variant="secondary">{t('contact_analyst')}</Button></Link>
    </div>
  );
};

export { ConjunctionAlertNextUpdate };
