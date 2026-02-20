import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getReentryReports } from '@/actions/getReentryReports';
import { getSatellite } from '@/actions/getSatellite';
import { getSession } from '@/actions/getSession';
import { ContentNavigation } from '@/components/ContentNavigation';
import { ReentryAccordion } from '@/components/re-entry/ReentryAccordion';
import { ReentryButtons } from '@/components/re-entry/ReentryButtons';
import { ReentryEventSummary } from '@/components/re-entry/ReentryEventSummary';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Spinner from '@/ui/spinner/spinner';
import { isAgencyUser, isGovUser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry');
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.norad_id);
  return {
    title: t('title', { objectName: satellite.common_name }),
  };
}

export default async function Reentry({
  params,
}: PageProps) {
  const t = await getTranslations('Reentry');
  const session = await getSession();
  const { shortId } = await params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.norad_id);
  const reports = await getReentryReports({ shortId });
  const object = satellite?.norad_id ? satellite : null;

  return (
    <div>
      {reports.length > 0 && (isAgencyUser(session?.user.role) || isGovUser(session?.user.role)) && (
        <NotificationBanner heading={t.rich('notification_banner', {
          preview: chunks => <Link className="govuk-link" href={`/re-entries/${shortId}/alert`}>{chunks}</Link>,
        })}
        />
      )}
      <h1 className="govuk-heading-xl">
        {t('title', { objectName: satellite.common_name })}
        <span className="block text-lg">{dayjs(event.decay_epoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <div className="md:col-span-3">
          <Suspense fallback={<Spinner />}>
            <ReentryEventSummary event={event} shortId={shortId} object={object} />
          </Suspense>
          <ReentryAccordion object={object} noradId={event.norad_id} />
          <ReentryButtons title={t('title', { objectName: satellite.common_name })} />
        </div>
      </div>
    </div>
  );
}
