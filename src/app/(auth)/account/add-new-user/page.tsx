import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getOrganizations } from '@/actions/getOrganisations';
import { getSession } from '@/actions/getSession';
import { getUsersMe } from '@/actions/getUsersMe';
import { AddNewUserForm } from '@/components/account/add-new-user/AddNewUserForm';
import BackLink from '@/ui/back-link/back-link';
import { isOrgAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Add new user',
};

export default async function AddNewUserPage(props: {
  searchParams?: Promise<{
    organization_id?: string;
  }>;
}) {
  const t = await getTranslations('Add_new_user');

  const session = await getSession();
  const { organization_id } = await getUsersMe();
  const organizations = await getOrganizations();
  const searchParams = await props.searchParams;

  const defaultValues = {
    organization_id: searchParams?.organization_id || organization_id,
  };

  if (!isOrgAdmin(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <BackLink />
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <AddNewUserForm role={session?.user.role} defaultValues={defaultValues} organizations={organizations} />
    </div>
  );
}
