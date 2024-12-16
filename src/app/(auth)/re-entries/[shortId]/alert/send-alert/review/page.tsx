import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { putReentryAlertLatest } from '@/actions/putReentryAlertLatest';
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
    await getReentryEvent(shortId);
    return {
      title: t('title'),
    };
  } catch {
    notFound();
  }
}
export default async function ReentryAlertEditReview({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: EventAlertSearchParams;
}) {
  const { shortId } = await params;

  return <EventAlertSendReview type="re-entry" shortId={shortId} data={searchParams} action={putReentryAlertLatest} />;
}
