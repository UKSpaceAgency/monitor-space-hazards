import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import { getSession } from '@/actions/getSession';
import { ScheduleBannerConfirm } from '@/components/account/incident-banners/schedule/confirm/ScheduleBannerConfirm';
import Api from '@/libs/Api';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import SummaryList from '@/ui/summary-list/summary-list';
import { isSuperAdmin } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Confirm schedule incident banners',
};

export default async function BannerConfirmSchedulePage(props: {
  searchParams?: Promise<TypeBannerScheduleIn>;
}) {
  const searchParams = await props.searchParams;
  if (!searchParams) {
    redirect('/account/incident-banner');
  }

  const { data: templates } = await Api.getBannersMessages();
  const template = templates.find(template => template.id === searchParams.message_id);
  if (!template) {
    redirect('/account/incident-banner');
  }

  const t = await getTranslations('Incident_banners.Confirm');

  const session = await getSession();

  if (!isSuperAdmin(session?.user.role)) {
    return notFound();
  }

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <SummaryList rows={[{
        key: {
          children: t('incident_type'),
        },
        value: {
          children: template.title,
        },
      }, {
        key: {
          children: t('active_time'),
        },
        value: {
          children: `${dayjs(searchParams.broadcast_start).format(FORMAT_DATE_TIME)} to ${dayjs(searchParams.broadcast_end).format(FORMAT_DATE_TIME)}`,
        },
      }]}
      />
      <ScheduleBannerConfirm title={template.title} banner={searchParams} />
    </div>
  );
}
