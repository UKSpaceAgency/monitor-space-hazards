import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { patchUsersMe } from '@/actions/patchUsersMe';
import { AccountType } from '@/libs/Roles';
import Button from '@/ui/button/button';
import SummaryList from '@/ui/summary-list/summary-list';

export const metadata: Metadata = {
  title: 'View your account details',
};

export default async function ContactAndOrganisationInformation() {
  const t = await getTranslations('ContactAndOrganisationInformation');
  const tCommon = await getTranslations('Common');

  const data = await getUsersMe();

  const saveAndContinue = async () => {
    'use server';

    await patchUsersMe({
      account_details_confirmed_at: new Date().toJSON(),
    });

    redirect('/account');
  };

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>

      <div className="flex gap-2 govuk-body">
        <p>{t('contact_the_uksa_via')}</p>
        <a className="govuk-link" href="mailto:monitoryoursatellites@ukspaceagency.gov.uk">{t('email')}</a>
        <p>{t('if_your_contact_details_are_incorrect')}</p>
      </div>

      <SummaryList rows={[
        {
          key: t('keys.organisation'),
          value: data.organization_name,
        },
        {
          key: t('keys.user_type'),
          value: AccountType[data.role || 'AGENCY_ADMIN'],
        },
        {
          key: t('keys.email_address'),
          value: data.email,
        },
        {
          key: t('keys.phone_number'),
          value: data.phone_number,
        },
      ]}
      />

      {data.account_details_confirmed_at
        ? (
            <Link href="/account">
              <Button type="submit" element="button">
                {tCommon('return', { to: 'account page' })}
              </Button>
            </Link>
          )
        : (
            <form action={saveAndContinue}>
              <Button type="submit" element="button">{tCommon('save_and_continue')}</Button>
            </form>
          )}
    </div>
  );
}
