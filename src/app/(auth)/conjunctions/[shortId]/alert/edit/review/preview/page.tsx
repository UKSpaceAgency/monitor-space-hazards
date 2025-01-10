import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { patchConjunctionUniqueEvent } from '@/actions/patchConjunctionUniqueEvent';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import { EventAlertPublish } from '@/components/event-alert-edit/EventAlertPublish';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type PageProps = {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<TypeUniqueEventUpdateTextFieldsIn>;
};

export async function generateMetadata(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  await getConjunctionUniqueEvent(shortId);
  return {
    title: t('title', { shortId }),
  };
}

export default async function ConjunctionAlertEditPreview(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

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
