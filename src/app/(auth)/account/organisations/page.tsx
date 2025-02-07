import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getOrganizations } from '@/actions/getOrganisations';
import { auth } from '@/auth';
import { OrganisationsSummary } from '@/components/account/organisations/OrganisationsSummary';
import { OrganisationsTable } from '@/components/account/organisations/OrganisationsTable';
import { isAgencyApprover, isAnalysist } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Organisations',
};

export default async function OrganisationsPage() {
  const t = await getTranslations('Organisations');
  const session = await auth();

  if (!isAgencyApprover(session?.user.role)) {
    return notFound();
  }

  const organisations = await getOrganizations();

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {isAnalysist(session?.user.role) && <OrganisationsSummary organisations={organisations} />}
      <OrganisationsTable organisations={organisations} />
    </div>
  );
}
