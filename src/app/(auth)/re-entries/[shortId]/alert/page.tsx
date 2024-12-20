import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { ReentryAlertPage } from '@/components/re-entry-alert/ReentryAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Reentry_alert');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);

  if (!event) {
    notFound();
  }
  return {
    title: t('title', { objectName: event.objectName }),
  };
}

export default async function ReentryAlert({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Reentry_alert');
  const { shortId } = await params;

  return (
    <div>
      <NotificationBanner heading={t.rich('notification_banner', {
        edit: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/edit`}>{chunks}</Link>,
        send: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/send-alert`}>{chunks}</Link>,
      })}
      />
      <Suspense fallback={<Spinner />}>
        <ReentryAlertPage shortId={shortId} />
      </Suspense>
    </div>
  );
}
