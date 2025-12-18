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
      <DownloadData type={t('daily_title')} params={params} downloadAction={getStatsReentryEventsType} ariaLabel="Daily Reentry events by type" />
      <Details summary={t.rich('daily_details.title')}>
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <MonitoringReentryEventsByTypeMonthly />
      <DownloadData type={t('monthly_title')} params={{}} downloadAction={getStatsMonthlyReentryEventsByObjectType} ariaLabel="Monthly Reentry events by type" />
      <Details summary={t.rich('monthly_details.title')}>
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { MonitoringReentryEventsByType };
