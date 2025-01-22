import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getBannersMessages } from '@/actions/getBannersMessages';
import { ScheduleBannerForm } from '@/components/account/incident-banners/schedule/ScheduleBannerForm';

export const metadata: Metadata = {
  title: 'Schedule incident banners',
};

export default async function NewIncidentBannerPage() {
  const t = await getTranslations('Incident_banners');

  const templates = await getBannersMessages();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <ScheduleBannerForm templates={templates} />
    </div>
  );
}
