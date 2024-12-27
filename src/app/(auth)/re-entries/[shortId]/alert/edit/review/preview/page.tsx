import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { patchReentryEvent } from '@/actions/patchReentryEvent';
import { EventAlertPublish } from '@/components/event-alert-edit/EventAlertPublish';
import { ReentryAlertPage } from '@/components/re-entry-alert/ReentryAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeReentryEventPatch>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await props.params;

  try {
    const event = await getReentryEvent(shortId);
    const satellite = await getSatellite(event.noradId);
    return {
      title: t('title', { objectName: satellite.commonName }),
    };
  } catch {
    notFound();
  }
}

export default async function ReentryAlertEditPreview(props: PageProps) {
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations('Reentry_alert_edit');

  if (!searchParams) {
    redirect(`/re-entries/${shortId}/alert`);
  }

  return (
    <div>
      <h2 className="govuk-heading-xl">{t('preview.title')}</h2>
      <NotificationBanner heading={t('preview.banner.title')}>
        <p className="govuk-body">{t('preview.banner.content')}</p>
      </NotificationBanner>
      <ReentryAlertPage shortId={shortId} searchParams={searchParams} footer={<EventAlertPublish shortId={shortId} action={patchReentryEvent} />} />
    </div>
  );
}
