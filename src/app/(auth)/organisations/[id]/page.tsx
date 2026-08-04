import { notFound } from 'next/navigation';

import type { TypeEpoch } from '@/__generated__/data-contracts';
import { getOrganisation } from '@/actions/getOrganisation';
import { getSession } from '@/actions/getSession';
import { ContentNavigation } from '@/components/ContentNavigation';
import { OperatorSummary } from '@/components/organisation/OperatorSummary';
import { OrganisationAccordion } from '@/components/organisation/OrganisationAccordion';
import { isInternationalUser } from '@/utils/Roles';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    epoch?: TypeEpoch;
    search_like?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const organisation = await getOrganisation(id);
  return {
    title: organisation.name,
  };
}

export default async function OrganisationPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { epoch, search_like: searchLike } = await searchParams || {};
  const session = await getSession();
  const organisation = await getOrganisation(id);

  if (isInternationalUser(session?.user.role)) {
    notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {organisation.name}
      </h1>
      <ContentNavigation />
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
      <article className="md:col-span-3">
        <OperatorSummary organisation={organisation} />
        <OrganisationAccordion organisation={organisation} epoch={epoch} searchLike={searchLike} />
      </article>
    </div>
  );
}
