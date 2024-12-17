import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getAlerts } from '@/actions/getAlerts';
import { DistributionListAccordions } from '@/components/account/distribution-list/DistributionListAccordion';

export const metadata: Metadata = {
  title: 'View distribution lists',
};

export default async function DistributionListsPage() {
  const t = await getTranslations('Distribution_lists');

  const alerts = await getAlerts();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <DistributionListAccordions alerts={alerts} />
    </div>
  );
}
