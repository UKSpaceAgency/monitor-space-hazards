import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Conjunction_alert');
  const { shortId } = await params;
  try {
    const event = await getConjunctionUniqueEvent(shortId);
    if (!event) {
      notFound();
    }
    return {
      title: t('title', { shortId }),
    };
  } catch {
    notFound();
  }
}

export default async function ConjunctionAlert({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('Conjunction_alert');
  const { shortId } = await params;

  return (
    <div>
      <NotificationBanner heading={t.rich('notification_banner', {
        edit: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}/alert/edit`}>{chunks}</Link>,
        send: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}/alert/send-alert`}>{chunks}</Link>,
      })}
      />
      <Suspense fallback={<Spinner />}>
        <ConjunctionAlertPage shortId={shortId} />
      </Suspense>
    </div>
  );
}
