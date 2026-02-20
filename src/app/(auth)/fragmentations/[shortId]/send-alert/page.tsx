import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getFragmentationAlertLatest } from '@/actions/getFragmentationAlertLatest';
import { getSession } from '@/actions/getSession';
import { EventAlertSend } from '@/components/event-alert-send/EventAlertSend';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata() {
  const t = await getTranslations('Forms.Send_alert');
  return {
    title: t('title'),
  };
}

export default async function FragmentationAlertSend({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation_alert_send');
  const { shortId } = await params;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  const alert = await getFragmentationAlertLatest(shortId);

  const detailsContent = t.rich('alert_criteria_help.content', {
    link: chunks => <Link className="govuk-link" href="/account/distribution-list">{chunks}</Link>,
  });

  const defaultValues = {
    isStandard: alert.alert_type.includes('standard'),
    isPriority: alert.alert_type.includes('priority'),
    additionalRecipients: alert.additional_recipients?.join('; ') || '',
  };

  return <EventAlertSend type="fragmentation" data={defaultValues} content={t.rich('content')} detailsSummary={t('alert_criteria_help.title')} detailsContent={detailsContent} />;
}
