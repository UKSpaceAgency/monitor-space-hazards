import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getSession } from '@/actions/getSession';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeUniqueEventUpdateTextFieldsIn>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await props.params;

  const event = await getFragmentationEvent(shortId);

  return {
    title: t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` }),
  };
}

export default async function FragmentationAlertEditReview(props: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  if (!searchParams) {
    redirect(`/fragmentations/${shortId}`);
  }
  const event = await getFragmentationEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` })}
        <span className="block text-lg">{dayjs(event.event_epoch).format(FORMAT_FULL_DATE_TIME)}</span>
      </h1>
      <EventAlertReview shortId={shortId} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
