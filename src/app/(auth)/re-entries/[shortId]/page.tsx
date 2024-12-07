import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { ContentNavigation } from '@/components/ContentNavigation';
import { ReentryAccordion } from '@/components/re-entry/ReentryAccordion';
import { ReentryEventSummary } from '@/components/re-entry/ReentryEventSummary';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Re-entry');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.noradId);

  if (!event && !satellite) {
    notFound();
  }
  return {
    title: t('title', { objectName: satellite.commonName }),
  };
}

export default async function Reentry({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Re-entry');
  const tCommon = await getTranslations('Common');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.noradId);

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { objectName: satellite.commonName })}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          <Suspense fallback={<Spinner />}>
            <ReentryEventSummary event={event} object={satellite} />
          </Suspense>
          <ReentryAccordion object={satellite} noradId={event.noradId} />
          <Link href="/re-entries">
            <Button variant="secondary">{tCommon('return', { to: 'previous page' })}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
