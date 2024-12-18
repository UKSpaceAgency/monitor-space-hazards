import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { EventAlertReview } from '@/components/event-alert-edit/EventAlertReview';

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
    redirect(`/conjunctions/${shortId}/alert`);
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

export default async function ConjunctionAlertEditReview({
  params,
  searchParams,
}: {
  params: Promise<{ shortId: string }>;
  searchParams: TypeUniqueEventUpdateTextFieldsIn;
}) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { shortId })}
      </h1>
      <EventAlertReview shortId={shortId} values={searchParams} description={t('review_description', { shortId })} />
    </div>
  );
}
