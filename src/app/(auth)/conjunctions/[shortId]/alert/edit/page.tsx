import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import getConjunctionUniqueEvent from '@/actions/getConjunctionUniqueEvent';
import { ConjunctionAlertEditForm } from '@/components/conjunction-alert-edit/ConjunctionAlertEditForm';

type PageProps = {
  params: Promise<{ shortId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;
  try {
    await getConjunctionUniqueEvent(shortId);
    return {
      title: t('title', { shortId }),
    };
  } catch {
    notFound();
  }
}

export default async function ConjunctionAlertEdit({
  params,
}: PageProps) {
  const t = await getTranslations('Conjunction_alert_edit');
  const { shortId } = await params;
  const event = await getConjunctionUniqueEvent(shortId);

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title', { shortId })}
      </h1>
      {t.rich('content')}
      <ConjunctionAlertEditForm event={event} />
    </div>
  );
}
