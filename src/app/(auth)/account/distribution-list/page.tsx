import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'View distribution lists',
};

export default async function DistributionListsPage() {
  const t = await getTranslations('DistributionLists');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
    </div>
  );
}
