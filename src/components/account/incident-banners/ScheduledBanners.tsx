import { getTranslations } from 'next-intl/server';

import { getIncidentBanners } from '@/actions/getIncidentBanners';

import { ScheduledBannersTable } from './ScheduledBannersTable';

const ScheduledBanners = async () => {
  const t = await getTranslations('IncidentBanners.Scheduled_banners');

  const banners = await getIncidentBanners();

  return (
    <div className="mt-12">
      <h2 className="govuk-heading-l">{t('title')}</h2>
      <ScheduledBannersTable banners={banners} />
    </div>
  );
};

export { ScheduledBanners };
