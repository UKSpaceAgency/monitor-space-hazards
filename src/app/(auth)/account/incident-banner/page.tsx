import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/actions/getSession';
import { ScheduledBanners } from '@/components/account/incident-banners/ScheduledBanners';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { isSuperAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Manage incident banners',
};

export default async function IncidentBannersPage() {
  const t = await getTranslations('Incident_banners');
  const tCommon = await getTranslations('Common');

  const session = await getSession();

  if (!isSuperAdmin(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {t.rich('content')}
      <ScheduledBanners />
      <ButtonGroup>
        <Link href="/account/incident-banner/schedule">
          <Button>{t('add_new')}</Button>
        </Link>
        <Link href="/account">
          <Button variant="secondary">{tCommon('return', { to: 'account page' })}</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}
