import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSession } from '@/actions/getSession';
import { ReentryAlertPage } from '@/components/re-entry-alert/ReentryAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  return {
    title: t('title', { objectName: event.objectName }),
  };
}

export default async function ReentryAlert({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert');
  const session = await getSession();
  const role = session?.user.role;
  const { shortId } = await params;

  return (
    <div>
      {(role === 'AGENCY_APPROVER' || role === 'AGENCY_SUPERUSER') && (
        <NotificationBanner heading={t.rich('notification_banner', {
          edit: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/edit`}>{chunks}</Link>,
          send: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert/send-alert`}>{chunks}</Link>,
        })}
        />
      )}
      <ReentryAlertPage shortId={shortId} />
    </div>
  );
}
