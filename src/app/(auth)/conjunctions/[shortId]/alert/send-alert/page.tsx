import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { EventAlertSend } from '@/components/event-alert-send/EventAlertSend';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert');
  const { shortId } = await params;
  await getConjunctionAlertLatest(shortId);
  return {
    title: t('title'),
  };
}

export default async function ConjunctionAlertSend({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert_send');
  const { shortId } = await params;

  const alert = await getConjunctionAlertLatest(shortId);

  const detailsContent = t.rich('alert_criteria_help.content', {
    link: chunks => <Link className="govuk-link" href="/account/distribution-list">{chunks}</Link>,
  });

  const defaultValues = {
    isPriority: alert.alertType === 'auto-priority' || alert.alertType === 'manual-priority',
    additionalRecipients: alert.additionalRecipients?.join('; ') || '',
  };

  return <EventAlertSend type="conjunction" data={defaultValues} content={t.rich('content')} detailsSummary={t('alert_criteria_help.title')} detailsContent={detailsContent} />;
}
