import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserPhoneForm } from '@/components/account/organisations/organisation/OrganisationUserPhoneForm';
import { isOrgAdmin } from '@/utils/Roles';

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}) {
  const userId = (await params).userId;
  const user = await getUsersById(userId);

  if (!isOrgAdmin(user.role)) {
    return notFound();
  }

  return {
    title: user.role,
  };
}

export default async function OrganisationUserPhonePage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const t = await getTranslations('OrganisationUser.phone_change');

  const { userId } = await params;

  const user = await getUsersById(userId);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('users_current_address', { phone: user.phoneNumber })}</p>
      <OrganisationUserPhoneForm user={user} />
    </div>
  );
}
