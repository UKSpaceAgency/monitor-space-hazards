import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { patchConjunctionUniqueEvent } from '@/actions/patchConjunctionUniqueEvent';
import { ConjunctionAlertPage } from '@/components/conjunction-alert/ConjunctionAlertPage';
import { EventAlertPublish } from '@/components/event-alert-edit/EventAlertPublish';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: TypeUniqueEventUpdateTextFieldsIn;
}) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;

  if (!searchParams) {
    redirect(`/conjunction/${shortId}/alert`);
  }

  try {
    await getConjunctionUniqueEvent(shortId);
    return {
      title: t('title', { shortId }),
    };
  } catch {
    notFound();
  }
}

export default async function ConjunctionAlertEditPreview({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: TypeUniqueEventUpdateTextFieldsIn;
}) {
  const { shortId } = await params;
  const t = await getTranslations('Conjunction_alert_edit');

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
