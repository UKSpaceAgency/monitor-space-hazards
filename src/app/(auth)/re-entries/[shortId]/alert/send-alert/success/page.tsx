import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { EventAlertSendSuccess } from '@/components/event-alert-send/EventAlertSendSuccess';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Forms.Send_alert.Success');
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
export default async function ReentryAlertEditSuccess({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const { shortId } = await params;

  return <EventAlertSendSuccess type="re-entry" shortId={shortId} />;
}
