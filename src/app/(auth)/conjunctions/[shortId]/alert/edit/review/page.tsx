import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';

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

export default async function ConjunctionAlertEditReview(props: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  if (!searchParams) {
    redirect(`/conjunctions/${shortId}/alert`);
  }

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { shortId })}
      </h1>
      <EventAlertReview shortId={shortId} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
