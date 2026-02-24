import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';

type FragmentationNextUpdateProps = {
  shortId: string;
};

const FragmentationNextUpdate = ({ shortId }: FragmentationNextUpdateProps) => {
  const t = useTranslations('Fragmentation.Next_update');
  return (
    <div>
      <h3 className="govuk-heading-m">{t('title')}</h3>
      <p className="govuk-body">{t('content')}</p>
      <Button as="link" aria-label={t('contact_analyst')} href={`/contact-analyst/fragmentations?id=${shortId}&callback=/fragmentations/${shortId}/alert`}>{t('contact_analyst')}</Button>
    </div>
  );
};

export { FragmentationNextUpdate };
