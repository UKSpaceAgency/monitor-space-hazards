import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryAlertLatest } from '@/actions/getReentryAlertLatest';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { EventAlertSend } from '@/components/event-alert-send/EventAlertSend';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Forms.Send_alert');
  const { shortId } = await params;
  try {
    await getReentryEvent(shortId);
    return {
      title: t('title'),
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
  const t = await getTranslations('Reentry_alert_send');
  const { shortId } = await params;

  const alert = await getReentryAlertLatest(shortId);

  const detailsContent = t.rich('alert_criteria_help.content', {
    link: chunks => <Link className="govuk-link" href="/account/distribution-list">{chunks}</Link>,
  });

  const defaultValues = {
    isPriority: alert.alertType === 'auto-priority' || alert.alertType === 'manual-priority',
    additionalRecipients: alert.additionalRecipients?.join('; ') || '',
  };

  return <EventAlertSend type="re-entry" data={defaultValues} content={t.rich('content')} detailsSummary={t('alert_criteria_help.title')} detailsContent={detailsContent} />;
}
