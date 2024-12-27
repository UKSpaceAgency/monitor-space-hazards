import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { putConjunctionAlertLatest } from '@/actions/putConjunctionAlertLatest';
import { EventAlertSendReview } from '@/components/event-alert-send/EventAlertSendReview';
import type { EventAlertSearchParams } from '@/components/event-alert-send/EventAlertTypes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Forms.Send_alert.Review');
  const { shortId } = await params;
  try {
    await getConjunctionAlertLatest(shortId);
    return {
      title: t('title'),
    };
  } catch {
    notFound();
  }
}
export default async function ConjunctionAlertEditReview({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: EventAlertSearchParams;
}) {
  const { shortId } = await params;

  return <EventAlertSendReview type="conjunction" shortId={shortId} data={searchParams} action={putConjunctionAlertLatest} />;
}
