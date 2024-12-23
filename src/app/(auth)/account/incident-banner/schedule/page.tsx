import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import { ScheduleBannerForm } from '@/components/account/incident-banners/schedule/ScheduleBannerForm';
import Api from '@/libs/Api';

export const metadata: Metadata = {
  title: 'Schedule incident banners',
};

export default async function NewIncidentBannerPage() {
  const t = await getTranslations('Incident_banners');

  const { data: templates } = await Api.getBannersMessages();

  const handleSubmit = async ({ broadcastStart, broadcastEnd, messageId }: TypeBannerScheduleIn) => {
    'use server';
    const params = new URLSearchParams({
      broadcastStart,
      broadcastEnd,
      messageId,
    });
    redirect(`/account/incident-banner/schedule/confirm/?${params.toString()}`);
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <ScheduleBannerForm templates={templates} startDate={new Date()} handleForm={handleSubmit} />
    </div>
  );
}
