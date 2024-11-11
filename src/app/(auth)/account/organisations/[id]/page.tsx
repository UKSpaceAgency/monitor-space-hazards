import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getOrganisation } from '@/actions/getOrganisation';
import { OrganisationTable } from '@/components/account/organisations/organisation/OrganisationSatellitesTable';
import { OrganisationSummary } from '@/components/account/organisations/organisation/OrganisationSummary';
import { OrganisationUsersTable } from '@/components/account/organisations/organisation/OrganisationUsersTable';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Spinner from '@/ui/spinner/spinner';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const organisation = await getOrganisation(id);
  return {
    title: organisation.name,
  };
}

export default async function OrganisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations('Organisation');
  const tCommon = await getTranslations('Common');

  const { id } = await params;
  const organisation = await getOrganisation(id);

  return (
    <div>
      <h1 className="govuk-heading-xl">{organisation.name}</h1>
      <OrganisationSummary satellites={organisation.satellitesCount} users={organisation.accountsCount} />
      <Suspense fallback={<Spinner />}>
        <OrganisationTable organisationId={organisation.id as string} />
        <OrganisationUsersTable organisationId={organisation.id as string} />
      </Suspense>
      <ButtonGroup>
        <Link href={{
          pathname: '/account/add-new-user',
          query: {
            organization_id: organisation.id,
          },
        }}
        >
          <Button>{t('add_new_user')}</Button>
        </Link>
        <Link href="/account/organisations">
          <Button variant="secondary">{tCommon('return', { to: 'organisation page' })}</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}
