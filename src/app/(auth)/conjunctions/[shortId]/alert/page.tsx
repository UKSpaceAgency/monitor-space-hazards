import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { getSession } from '@/actions/getSession';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { isAgencyApproverOrSuperuser, isSatteliteUser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert');
  const { shortId } = await params;
  const event = await getConjunctionUniqueEvent(shortId);
  return {
    title: t('title', { primaryObject: event.primaryObjectCommonName, secondaryObject: event.secondaryObjectCommonName }),
  };
}

export default async function ConjunctionAlert({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert');
  const session = await getSession();
  const role = session?.user.role;
  const { shortId } = await params;

  if (isSatteliteUser(role)) {
    return notFound();
  }

  return (
    <div>
      {isAgencyApproverOrSuperuser(role) && (
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
