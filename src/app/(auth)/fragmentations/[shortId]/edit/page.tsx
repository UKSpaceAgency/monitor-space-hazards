import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getFragmentationReportsLatest } from '@/actions/getFragmentationReportsLatest';
import { getSession } from '@/actions/getSession';
import { FragmentationAlertEditForm } from '@/components/fragmentation-alert-edit/FragmentationAlertEditForm';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await params;
  const event = await getFragmentationEvent(shortId);

  return {
    title: t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` }),
  };
}

export default async function FragmentationAlertEdit({
  params,
}: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await params;

  const session = await getSession();

  const event = await getFragmentationEvent(shortId);
  const report = await getFragmentationReportsLatest(shortId);

  if (!isAgencyApproverOrSuperuser(session?.user.role) || !report) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` })}
        <span className="block text-lg">{dayjs(event.event_epoch).format(FORMAT_FULL_DATE_TIME)}</span>
      </h1>
      {t.rich('content')}
      <FragmentationAlertEditForm event={event} />
    </div>
  );
}
