import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserTypeForm } from '@/components/account/organisations/organisation/OrganisationUserTypeForm';
import { WarningText } from '@/ui/warning-text/warning-text';

export const metadata: Metadata = {
  title: 'User role',
};

export default async function OrganisationUserPhonePage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const t = await getTranslations('Organisation_user.type_change');

  const { userId } = await params;

  const user = await getUsersById(userId);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <WarningText>{t('warning')}</WarningText>
      <OrganisationUserTypeForm user={user} />
    </div>
  );
}
