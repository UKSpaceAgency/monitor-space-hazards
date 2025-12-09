import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeFragmentationEventPatch } from '@/__generated__/data-contracts';
import { getFragmentationEvent } from '@/actions/getFragmentationEvent';
import { getSession } from '@/actions/getSession';
import { patchFragmentationEvent } from '@/actions/patchFragmentationEvent';
import { EventAlertPublish } from '@/components/event-alert-edit/EventAlertPublish';
import { FragmentationPage } from '@/components/fragmentation/FragmentationPage';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeFragmentationEventPatch>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await props.params;
  const event = await getFragmentationEvent(shortId);
  return {
    title: t('title', { object: `${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}` }),
  };
}

export default async function FragmentationAlertEditPreview(props: PageProps) {
  const t = await getTranslations('Fragmentation_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  if (!searchParams) {
    redirect(`/fragmentations/${shortId}/edit`);
  }

  return (
    <div>
      <h2 className="govuk-heading-xl">{t('preview.title')}</h2>
      <NotificationBanner heading={t('preview.banner.title')}>
        <p className="govuk-body">{t('preview.banner.content')}</p>
      </NotificationBanner>
      <FragmentationPage shortId={shortId} searchParams={searchParams} footer={<EventAlertPublish shortId={shortId} action={patchFragmentationEvent} />} />
    </div>
  );
}
