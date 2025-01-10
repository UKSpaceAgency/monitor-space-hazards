import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { ReentryAlertEditForm } from '@/components/re-entry-alert-edit/ReentryAlertEditForm';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.noradId);
  return {
    title: t('title', { objectName: satellite.commonName }),
  };
}

export default async function ReentryAlertEdit({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { objectName: event.objectName })}
        <span className="block text-lg">{dayjs(event.decayEpoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      {t.rich('content')}
      <ReentryAlertEditForm event={event} />
    </div>
  );
}
