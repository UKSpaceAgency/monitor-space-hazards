import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: TypeReentryEventPatch;
}) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await params;

  if (!searchParams) {
    redirect(`/re-entries/${shortId}/alert`);
  }

  try {
    const event = await getReentryEvent(shortId);
    const satellite = await getSatellite(event.noradId);
    return {
      title: t('title', { objectName: satellite.commonName }),
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
  searchParams: TypeReentryEventPatch;
}) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { objectName: event.objectName })}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <EventAlertReview shortId={event.shortId} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
