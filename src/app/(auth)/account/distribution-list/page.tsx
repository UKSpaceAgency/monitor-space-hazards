import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { DistributionListAccordion } from '@/components/account/distribution-list/DistributionListAccordion';

export const metadata: Metadata = {
  title: 'View distribution lists',
};

export default async function DistributionListsPage() {
  const t = await getTranslations('DistributionLists');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>

      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 'conjunction' })}
      </h2>

      <DistributionListAccordion />

      <h2 className="govuk-heading-l">
        {t('distribution_list', { type: 're-entry' })}
      </h2>

      <DistributionListAccordion />
    </div>
  );
}
