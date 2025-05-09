import { getTranslations } from 'next-intl/server';

import { getUsersByOrganisation } from '@/actions/getUsers';

import { OrganisationUsersTable } from './data-table/OrganisationUsersTable';

type OrganisationUsersProps = {
  organisationId: string;
};

const OrganisationUsers = async ({ organisationId }: OrganisationUsersProps) => {
  const t = await getTranslations('Organisation.users_table');

  const users = await getUsersByOrganisation(organisationId);

  return (
    <div>
      <h2 className="govuk-heading-l">{t('registered_users')}</h2>
      <OrganisationUsersTable users={users} />
    </div>

  );
};

export { OrganisationUsers };
