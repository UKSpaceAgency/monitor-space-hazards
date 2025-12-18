import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsConjunctionEventsType } from '@/actions/getStatsConjunctionEventsType';
import { getStatsMonthlyConjunctionEventsByObjectType } from '@/actions/getStatsMonthlyConjunctionEventsByObjectType';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { MonitoringConjunctionEventsByTypeDaily } from './MonitoringConjunctionEventsByTypeDaily';
import { MonitoringConjunctionEventsByTypeMonthly } from './MonitoringConjunctionEventsByTypeMonthly';

const MonitoringConjunctionEventsByType = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_event_by_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  return (
    <>
      <h3 className="govuk-heading-s">{t('daily_title')}</h3>
      <MonitoringConjunctionEventsByTypeDaily />
      <DownloadData type={t('daily_title')} params={params} downloadAction={getStatsConjunctionEventsType} ariaLabel="Daily Conjunction events by type" />
      <Details summary={t.rich('daily_details.title')}>
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <MonitoringConjunctionEventsByTypeMonthly />
      <DownloadData type={t('monthly_title')} params={{}} downloadAction={getStatsMonthlyConjunctionEventsByObjectType} ariaLabel="Monthly Conjunction events by type" />
      <Details summary={t.rich('monthly_details.title')}>
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { MonitoringConjunctionEventsByType };
