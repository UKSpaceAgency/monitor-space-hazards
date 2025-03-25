import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { getSession } from '@/actions/getSession';
import { ConjunctionAlertEditForm } from '@/components/conjunction-alert-edit/ConjunctionAlertEditForm';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
import { isAgencyApproverOrSuperuser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;
  await getConjunctionUniqueEvent(shortId);
  return {
    title: t('title', { shortId }),
  };
}

export default async function ConjunctionAlertEdit({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  const event = await getConjunctionUniqueEvent(shortId);
  const title = t('title', { primaryObject: event.primaryObjectCommonName, secondaryObject: event.secondaryObjectCommonName });

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {title}
        <span className="block text-lg">{dayjs(event.tca).format(FORMAT_FULL_DATE)}</span>
      </h1>
      {t.rich('content')}
      <ConjunctionAlertEditForm event={event} />
    </div>
  );
}
