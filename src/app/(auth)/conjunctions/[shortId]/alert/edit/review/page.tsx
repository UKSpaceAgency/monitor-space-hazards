import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { getSession } from '@/actions/getSession';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';
import { dayjs, FORMAT_FULL_DATE } from '@/libs/Dayjs';
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

export default async function ConjunctionAlertEditReview(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  const session = await getSession();

  if (!isAgencyApproverOrSuperuser(session?.user.role)) {
    return notFound();
  }

  if (!searchParams) {
    redirect(`/conjunctions/${shortId}/alert`);
  }
  const event = await getConjunctionUniqueEvent(shortId);
  const title = t('title', { primaryObject: event.primaryObjectCommonName, secondaryObject: event.secondaryObjectCommonName });

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {title}
        <span className="block text-lg">{dayjs(event.tca).format(FORMAT_FULL_DATE)}</span>
      </h1>
      <EventAlertReview shortId={shortId} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
