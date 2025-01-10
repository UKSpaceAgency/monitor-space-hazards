import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { EventAlertSendSuccess } from '@/components/event-alert-send/EventAlertSendSuccess';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert.Success');
  const { shortId } = await params;
  await getReentryEvent(shortId);
  return {
    title: t('title'),
  };
}
export default async function ReentryAlertEditSuccess({
  params,
}: PageProps) {
  const { shortId } = await params;

  return <EventAlertSendSuccess type="re-entry" shortId={shortId} />;
}
