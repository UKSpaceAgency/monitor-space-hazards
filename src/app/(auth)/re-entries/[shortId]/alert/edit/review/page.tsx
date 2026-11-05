import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getReentryEvent } from '@/actions/getReentryEvent';
import { getSatellite } from '@/actions/getSatellite';
import { getSession } from '@/actions/getSession';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import type { ReentryAlertEditFormValues } from '@/utils/reentryEditForm';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<ReentryAlertEditFormValues>;
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

  const reviewValues: ReentryAlertEditFormValues = {
    closed_comment: searchParams.closed_comment ?? '',
    executive_summary_comment: searchParams.executive_summary_comment ?? '',
    executive_summary_comment_level_1: searchParams.executive_summary_comment_level_1 ?? '',
    executive_summary_comment_level_2: searchParams.executive_summary_comment_level_2 ?? '',
    damages_liability_comment: searchParams.damages_liability_comment ?? '',
    uk_response_comment: searchParams.uk_response_comment ?? '',
    press_attention_comment: searchParams.press_attention_comment ?? '',
  };

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { objectName: event.object_name })}
        <span className="block text-lg">{dayjs(event.decay_epoch).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <EventAlertReview shortId={event.short_id} values={reviewValues} description={t('review_description', { shortId })} />
    </div>
  );
}
