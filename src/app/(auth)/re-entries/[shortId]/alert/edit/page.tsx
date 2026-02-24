import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { getSession } from '@/actions/getSession';
import { ReentryAlertEditForm } from '@/components/re-entry-alert-edit/ReentryAlertEditForm';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.norad_id);
  return {
    title: t('title', { objectName: satellite.common_name }),
  };
}

export default async function ReentryAlertEdit({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  const { shortId } = await params;
  const event = await getReentryEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { objectName: event.object_name })}
        <span className="block text-lg">{dayjs(event.decay_epoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      {t.rich('content')}
      <ReentryAlertEditForm event={event} />
    </div>
  );
}
