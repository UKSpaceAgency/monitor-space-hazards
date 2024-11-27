import { getTranslations } from 'next-intl/server';

export default async function FeedbackPage() {
  const t = await getTranslations('FeedbackPage');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      Feedback
    </div>
  );
}
