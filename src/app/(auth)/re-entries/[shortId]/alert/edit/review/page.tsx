import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeReentryEventPatch } from '@/__generated__/data-contracts';
import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { getSession } from '@/actions/getSession';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeReentryEventPatch>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await props.params;
  const event = await getReentryEvent(shortId);
  const satellite = await getSatellite(event.norad_id);
  return {
    title: t('title', { objectName: satellite.common_name }),
  };
}

export default async function ReentryAlertEditReview(props: PageProps) {
  const t = await getTranslations('Reentry_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  if (!searchParams) {
    redirect(`/re-entries/${shortId}/alert`);
  }

  const event = await getReentryEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { objectName: event.object_name })}
        <span className="block text-lg">{dayjs(event.decay_epoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <EventAlertReview shortId={event.short_id} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
