import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getAlerts } from '@/actions/getAlerts';
import { getSession } from '@/actions/getSession';
import { DistributionListAccordions } from '@/components/account/distribution-list/DistributionListAccordion';
import { isAgencyApprover } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'View distribution lists',
};

export default async function DistributionListsPage() {
  const t = await getTranslations('Distribution_lists');
  const session = await getSession();

  if (!isAgencyApprover(session?.user.role)) {
    return notFound();
  }

  const alerts = await getAlerts();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <DistributionListAccordions alerts={alerts} />
    </div>
  );
}
