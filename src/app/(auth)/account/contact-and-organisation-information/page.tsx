import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { patchUsersMe } from '@/actions/patchUsersMe';
import { update } from '@/auth';
import Button from '@/ui/button/button';
import SummaryList from '@/ui/summary-list/summary-list';
import { AccountType } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'View your account details',
};

export default async function ContactAndOrganisationInformation() {
  const t = await getTranslations('Contact_and_organisation_information');
  const tCommon = await getTranslations('Common');

  const data = await getUsersMe();

  const saveAndContinue = async () => {
    'use server';

    await patchUsersMe({
      account_details_confirmed_at: new Date().toJSON(),
    });

    await update({});

    redirect('/account');
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>

      <div className="flex gap-2 govuk-body">
        <p>{t('contact_the_uksa_via')}</p>
        <a className="govuk-link" href="mailto:monitorspacehazards@ukspaceagency.gov.uk">{t('email')}</a>
        <p>{t('if_your_contact_details_are_incorrect')}</p>
      </div>

      <SummaryList rows={[
        {
          key: {
            children: t('keys.organisation'),
          },
          value: {
            children: data.organization_name,
          },
        },
        {
          key: {
            children: t('keys.user_type'),
          },
          value: {
            children: AccountType[data.role || 'AGENCY_ADMIN'],
          },
        },
        {
          key: {
            children: t('keys.email_address'),
          },
          value: {
            children: data.email,
          },
        },
        {
          key: {
            children: t('keys.phone_number'),
          },
          value: {
            children: data.phone_number,
          },
        },
      ]}
      />

      {data.account_details_confirmed_at
        ? (
            <Link href="/account">
              <Button type="submit">
                {tCommon('return', { to: 'account page' })}
              </Button>
            </Link>
          )
        : (
            <form action={saveAndContinue}>
              <Button type="submit">{tCommon('save_and_continue')}</Button>
            </form>
          )}
    </div>
  );
}
