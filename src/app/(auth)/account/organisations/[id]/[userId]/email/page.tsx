import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserEmailForm } from '@/components/account/organisations/organisation/OrganisationUserEmailForm';
import { isOrgAdmin } from '@/utils/Roles';

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const userId = (await params).userId;
  const user = await getUsersById(userId);
  return {
    title: user.role,
  };
}

export default async function OrganisationUserEmailPage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const t = await getTranslations('OrganisationUser.email_page');

  const { userId } = await params;

  const user = await getUsersById(userId);
  const session = await getSession();

  if (!isOrgAdmin(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('users_current_address', { email: user.email })}</p>
      <OrganisationUserEmailForm user={user} />
    </div>
  );
}
