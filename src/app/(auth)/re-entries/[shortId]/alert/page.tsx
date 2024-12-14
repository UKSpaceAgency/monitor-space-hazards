import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { ReentryAlertPage } from '@/components/re-entry-alert/ReentryAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlert');
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

export default async function ReentryAlert({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ReentryAlert');
  const { shortId } = await params;

  return (
    <div>
      <NotificationBanner heading={t.rich('notification_banner', {
        edit: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/edit`}>{chunks}</Link>,
        send: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/send`}>{chunks}</Link>,
      })}
      />
      <Suspense fallback={<Spinner />}>
        <ReentryAlertPage shortId={shortId} />
      </Suspense>
    </div>
  );
}
