import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getBannersMessages } from '@/actions/getBannersMessages';
import { getSession } from '@/actions/getSession';
import { ScheduleBannerForm } from '@/components/account/incident-banners/schedule/ScheduleBannerForm';
import { isSuperAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Schedule incident banners',
};

export default async function NewIncidentBannerPage() {
  const t = await getTranslations('Incident_banners');

  const session = await getSession();

  if (!isSuperAdmin(session?.user.role)) {
    return notFound();
  }

  const templates = await getBannersMessages();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <ScheduleBannerForm templates={templates} />
    </div>
  );
}
