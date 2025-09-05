import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { getOrganisation } from '@/actions/getOrganisation';
import { getSession } from '@/actions/getSession';
import { OrganisationSatellites } from '@/components/account/organisations/organisation/OrganisationSatellites';
import { OrganisationSummary } from '@/components/account/organisations/organisation/OrganisationSummary';
import { OrganisationUserDeletionSucceededBanner } from '@/components/account/organisations/organisation/OrganisationUserDeletionSucceededBanner';
import { OrganisationUsers } from '@/components/account/organisations/organisation/OrganisationUsers';
import Button from '@/ui/button/button';
import ButtonGroup, { } from '@/ui/button-group/button-group';
import Spinner from '@/ui/spinner/spinner';
import { isGovUser, isOrgAdmin } from '@/utils/Roles';

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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ deletionUserSucceeded: string }>;
}) {
  const { deletionUserSucceeded } = await searchParams;
  const t = await getTranslations('Organisation');
  const tCommon = await getTranslations('Common');

  const session = await getSession();

  const isGovAdmin = isGovUser(session?.user.role);

  if (!isOrgAdmin(session?.user.role)) {
    return notFound();
  }

  const { id } = await params;
  const organisation = await getOrganisation(id);

  return (
    <div>
      <OrganisationUserDeletionSucceededBanner showBanner={deletionUserSucceeded === 'true'} buttonText={t('banner.close_button')} message={t('banner.success_message')} />
      <h1 className="govuk-heading-xl">{organisation.name}</h1>
      <OrganisationSummary satellites={organisation.satellitesCount} users={organisation.accountsCount} />
      <Suspense fallback={<Spinner />}>
        <OrganisationSatellites organisationId={organisation.id as string} />
        <OrganisationUsers organisationId={organisation.id as string} />
      </Suspense>
      <ButtonGroup>
        <Button
          as="link"
          href={{
            pathname: '/account/add-new-user',
            query: {
              organization_id: organisation.id,
            },
          }}
        >
          {t('add_new_user')}
        </Button>
        <Button as="link" href={isGovAdmin ? '/account' : '/account/organisations'} variant="secondary">{tCommon('return', { to: isGovAdmin ? 'account page' : 'organisations page' })}</Button>
      </ButtonGroup>
    </div>
  );
}
