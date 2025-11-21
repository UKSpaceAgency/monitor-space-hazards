import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { getSession } from '@/actions/getSession';
import { putFragmentationAlertLatest } from '@/actions/putFragmentationAlertLatest';
import { EventAlertSendReview } from '@/components/event-alert-send/EventAlertSendReview';
import type { EventAlertSearchParams } from '@/components/event-alert-send/EventAlertTypes';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<EventAlertSearchParams>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert.Review');
  const { shortId } = await params;
  await getConjunctionAlertLatest(shortId);
  return {
    title: t('title'),
  };
}
export default async function ConjunctionAlertEditReview(props: PageProps) {
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  return <EventAlertSendReview type="fragmentation" shortId={shortId} data={searchParams} action={putFragmentationAlertLatest} />;
}
