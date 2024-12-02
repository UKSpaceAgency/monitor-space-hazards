import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { FeedbackForm } from '@/components/feedback/FeedbackForm';

export const metadata: Metadata = {
  title: 'Give feedback on Monitor Space Hazards',
};

export default async function FeedbackPage() {
  const t = await getTranslations('Forms.Feedback');

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <FeedbackForm />
    </>
  );
}
