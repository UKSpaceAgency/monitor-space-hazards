import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { getSession } from '@/actions/getSession';
import { patchConjunctionUniqueEvent } from '@/actions/patchConjunctionUniqueEvent';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import { EventAlertPublish } from '@/components/event-alert-edit/EventAlertPublish';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeUniqueEventUpdateTextFieldsIn>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  const event = await getConjunctionUniqueEvent(shortId);
  return {
    title: t('title', { primaryObject: event.primaryObjectCommonName ?? 'Unknown', secondaryObject: event.secondaryObjectCommonName ?? 'Unknown' }),
  };
}

export default async function ConjunctionAlertEditPreview(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  if (!searchParams) {
    redirect(`/conjunction/${shortId}/alert`);
  }

  return (
    <div>
      <h2 className="govuk-heading-xl">{t('preview.title')}</h2>
      <NotificationBanner heading={t('preview.banner.title')}>
        <p className="govuk-body">{t('preview.banner.content')}</p>
      </NotificationBanner>
      <ConjunctionAlertPage shortId={shortId} searchParams={searchParams} footer={<EventAlertPublish shortId={shortId} action={patchConjunctionUniqueEvent} />} />
    </div>
  );
}
