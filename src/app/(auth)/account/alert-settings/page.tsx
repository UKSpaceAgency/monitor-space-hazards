import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Edit your alert settings',
};

export default async function AlertSettingsPage() {
  const t = await getTranslations('AlertSettings');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
    </div>
  );
}
