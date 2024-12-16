import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryAlertLatest } from '@/actions/getReentryAlertLatest';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { EventAlertSend } from '@/components/event-alert-send/EventAlertSend';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlertSend');
  const { shortId } = await params;
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

export default async function ReentryAlertSend({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlertSend');
  const { shortId } = await params;

  const alert = await getReentryAlertLatest(shortId);

  const detailsContent = t.rich('alert_critera_help.content', {
    link: chunks => <Link className="govuk-link" href="/account/distribution-list">{chunks}</Link>,
  });

  const defaultValues = {
    isPriority: alert.alertType === 'auto-priority' || alert.alertType === 'manual-priority',
    additionalRecipients: alert.additionalRecipients?.join(', ') || '',
  };

  return <EventAlertSend type="re-entry" data={defaultValues} content={t.rich('content')} detailsSummary={t('alert_critera_help.title')} detailsContent={detailsContent} />;
}
