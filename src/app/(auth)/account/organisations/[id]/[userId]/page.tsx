import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getOrganisation } from '@/actions/getOrganisation';
import { getSession } from '@/actions/getSession';
import { getUsersById } from '@/actions/getUserById';
import { OrganisationUserAccountDetails } from '@/components/account/organisations/organisation/OrganisationUserAccountDetails';
import SummaryList from '@/ui/summary-list/summary-list';
import { AccountType, isOrgAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'User account details',
};

export default async function OrganisationUserPage({
  params,
}: {
  params: Promise<{ userId: string; id: string }>;
}) {
  const t = await getTranslations('Organisation_user');

  const { userId, id } = await params;

  const user = await getUsersById(userId);
  const organisation = await getOrganisation(user.organizationId);
  const session = await getSession();

  if (!isOrgAdmin(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <SummaryList
        rows={[
          {
            key: {
              children: t('organisation'),
            },
            value: {
              children: organisation.name,
            },
          },
          {
            key: {
              children: t('user_type'),
            },
            value: {
              children: AccountType[user.role || 'AGENCY_ADMIN'],
            },
            actions: [
              {
                children: t('edit'),
                href: `/account/organisations/${id}/${userId}/type`,
              },
            ],
          },
          {
            key: {
              children: t('email'),
            },
            value: {
              children: user.email,
            },
          },
          {
            key: {
              children: t('phone'),
            },
            value: {
              children: user.phoneNumber,
            },
            actions: [
              {
                children: t('edit'),
                href: `/account/organisations/${id}/${userId}/phone`,
              },
            ],
          },
        ]}
      />
      <OrganisationUserAccountDetails user={user} />
    </div>
  );
}
