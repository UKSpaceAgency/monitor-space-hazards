import { getTranslations } from 'next-intl/server';

import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserEmailForm } from '@/components/account/organisations/organisation/OrganisationUserEmailForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
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
  const t = await getTranslations('Organisation_user.email_change');

  const { userId } = await params;

  const user = await getUsersById(userId);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('users_current_address', { email: user.email })}</p>
      <OrganisationUserEmailForm user={user} />
    </div>
  );
}
