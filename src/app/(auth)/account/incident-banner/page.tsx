import { getTranslations } from 'next-intl/server';

import { ScheduledBanners } from '@/components/account/incident-banners/ScheduledBanners';

export default async function IncidentBannersPage() {
  const t = await getTranslations('IncidentBanners');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <ScheduledBanners />
    </div>
  );
}
