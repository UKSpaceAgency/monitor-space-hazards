import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryAlertLatest } from '@/actions/getReentryAlertLatest';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSession } from '@/actions/getSession';
import { EventAlertSend } from '@/components/event-alert-send/EventAlertSend';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert');
  const { shortId } = await params;
  await getReentryEvent(shortId);
  return {
    title: t('title'),
  };
}

export default async function ReentryAlertSend({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert_send');
  const { shortId } = await params;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  const alert = await getReentryAlertLatest(shortId);

  const detailsContent = t.rich('alert_criteria_help.content', {
    link: chunks => <Link className="govuk-link" href="/account/distribution-list">{chunks}</Link>,
  });

  const defaultValues = {
    isStandard: alert.alertType.includes('standard'),
    isPriority: alert.alertType.includes('priority'),
    isUkSatellitesOnly: alert.alertType.includes('uk_satellites_only'),
    additionalRecipients: alert.additionalRecipients?.join('; ') || '',
  };

  return <EventAlertSend type="re-entry" data={defaultValues} content={t.rich('content')} detailsSummary={t('alert_criteria_help.title')} detailsContent={detailsContent} />;
}
