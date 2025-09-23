import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsMonthlyReentryEventsByObjectType } from '@/actions/getStatsMonthlyReentryEventsByObjectType';
import { getStatsReentryEventsType } from '@/actions/getStatsReentryEventsType';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { MonitoringReentryEventsByTypeDaily } from './MonitoringReentryEventsByTypeDaily';
import { MonitoringReentryEventsByTypeMonthly } from './MonitoringReentryEventsByTypeMonthly';

const MonitoringReentryEventsByType = async () => {
  const t = await getTranslations('Performance_monitoring.reentry_accordion.reentry_event_by_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  return (
    <>
      <h3 className="govuk-heading-s">{t('daily_title')}</h3>
      <MonitoringReentryEventsByTypeDaily />
      <DownloadData params={params} downloadAction={getStatsReentryEventsType} ariaLabel="Daily Reentry events by type" />
      <Details summary={t('daily_details.title')} aria-label="Daily Reentry events by type details">
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <MonitoringReentryEventsByTypeMonthly />
      <DownloadData params={{}} downloadAction={getStatsMonthlyReentryEventsByObjectType} ariaLabel="Monthly Reentry events by type" />
      <Details summary={t('monthly_details.title')} aria-label="Monthly Reentry events by type details">
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { MonitoringReentryEventsByType };
