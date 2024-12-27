import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { putReentryAlertLatest } from '@/actions/putReentryAlertLatest';
import { EventAlertSendReview } from '@/components/event-alert-send/EventAlertSendReview';
import type { EventAlertSearchParams } from '@/components/event-alert-send/EventAlertTypes';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: EventAlertSearchParams;
};

export async function generateMetadata({
  params,
}: PageProps) {
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
export default async function ReentryAlertEditReview(props: PageProps) {
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  return <EventAlertSendReview type="re-entry" shortId={shortId} data={searchParams} action={putReentryAlertLatest} />;
}
