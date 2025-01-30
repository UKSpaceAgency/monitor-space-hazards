import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSession } from '@/actions/getSession';
import { putReentryAlertLatest } from '@/actions/putReentryAlertLatest';
import { EventAlertSendReview } from '@/components/event-alert-send/EventAlertSendReview';
import type { EventAlertSearchParams } from '@/components/event-alert-send/EventAlertTypes';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: EventAlertSearchParams;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert.Review');
  const { shortId } = await params;
  await getReentryEvent(shortId);
  return {
    title: t('title'),
  };
}
export default async function ReentryAlertEditReview(props: PageProps) {
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  return <EventAlertSendReview type="re-entry" shortId={shortId} data={searchParams} action={putReentryAlertLatest} />;
}
