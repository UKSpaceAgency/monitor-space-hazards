import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { putConjunctionAlertLatest } from '@/actions/putConjunctionAlertLatest';
import { EventAlertSendReview } from '@/components/event-alert-send/EventAlertSendReview';
import type { EventAlertSearchParams } from '@/components/event-alert-send/EventAlertTypes';

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

  return <EventAlertSendReview type="conjunction" shortId={shortId} data={searchParams} action={putConjunctionAlertLatest} />;
}
