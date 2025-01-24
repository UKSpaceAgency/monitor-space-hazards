import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { getTranslations } from 'next-intl/server';

import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert');
  const { shortId } = await params;
  await getConjunctionUniqueEvent(shortId);
  return {
    title: t('title', { shortId }),
  };
}

export default async function ConjunctionAlert({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert');
  const session = await getSession();
  const role = session?.user.role;
  const { shortId } = await params;

  return (
    <div>
      {(role === 'AGENCY_APPROVER' || role === 'AGENCY_SUPERUSER') && (
        <NotificationBanner heading={t.rich('notification_banner', {
          edit: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}/alert/edit`}>{chunks}</Link>,
          send: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}/alert/send-alert`}>{chunks}</Link>,
        })}
        />
      )}
      <ConjunctionAlertPage shortId={shortId} />
    </div>
  );
}
