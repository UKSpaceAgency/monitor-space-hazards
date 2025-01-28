import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { getSession } from '@/actions/getSession';
import { EventAlertSendSuccess } from '@/components/event-alert-send/EventAlertSendSuccess';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert.Success');
  const { shortId } = await params;
  await getConjunctionAlertLatest(shortId);
  return {
    title: t('title'),
  };
}
export default async function ConjunctionAlertEditSuccess({
  params,
}: PageProps) {
  const { shortId } = await params;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  return <EventAlertSendSuccess type="conjunction" shortId={shortId} />;
}
