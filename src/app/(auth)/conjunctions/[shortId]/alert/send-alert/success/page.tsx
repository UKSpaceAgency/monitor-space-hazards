import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getConjunctionAlertLatest } from '@/actions/getConjunctionAlertLatest';
import { EventAlertSendSuccess } from '@/components/event-alert-send/EventAlertSendSuccess';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Forms.Send_alert.Success');
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
export default async function ConjunctionAlertEditSuccess({
  params,
}: PageProps) {
  const { shortId } = await params;

  return <EventAlertSendSuccess type="conjunction" shortId={shortId} />;
}
