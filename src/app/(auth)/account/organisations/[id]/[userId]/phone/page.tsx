import { getTranslations } from 'next-intl/server';

import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserPhoneForm } from '@/components/account/organisations/organisation/OrganisationUserPhoneForm';

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

export default async function OrganisationUserPhonePage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const t = await getTranslations('Organisation_user.phone_change');

  const { userId } = await params;

  const user = await getUsersById(userId);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('users_current_address', { phone: user.phone_number })}</p>
      <OrganisationUserPhoneForm user={user} />
    </div>
  );
}
