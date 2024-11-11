import { getTranslations } from 'next-intl/server';

import { getOrganizations } from '@/actions/getOrganisations';
import { getUsersMe } from '@/actions/getUsersMe';
import { auth } from '@/auth';
import { AddNewUserForm } from '@/components/account/add-new-user/AddNewUserForm';

export default async function AddNewUserPage(props: {
  searchParams?: Promise<{
    organization_id?: string;
  }>;
}) {
  const t = await getTranslations('AddNewUser');

  const session = await auth();
  const { organization_id } = await getUsersMe();
  const organizations = await getOrganizations();
  const searchParams = await props.searchParams;

  const defaultValues = {
    organization_id: searchParams?.organization_id || organization_id,
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <AddNewUserForm role={session?.user.role} defaultValues={defaultValues} organizations={organizations} />
    </div>
  );
}
