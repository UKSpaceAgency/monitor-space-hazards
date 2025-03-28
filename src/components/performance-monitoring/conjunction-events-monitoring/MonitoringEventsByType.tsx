import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsEventsType } from '@/actions/getStatsEventsType';
import { getStatsMonthlyConjunctionEventsByObjectType } from '@/actions/getStatsMonthlyConjunctionEventsByObjectType';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { MonitoringEventsByTypeDaily } from './MonitoringEventsByTypeDaily';
import { MonitoringEventsByTypeMonthly } from './MonitoringEventsByTypeMonthly';

const MonitoringEventsByType = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_event_by_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  return (
    <>
      <h3 className="govuk-heading-s">{t('daily_title')}</h3>
      <MonitoringEventsByTypeDaily />
      <DownloadData type={t('daily_title')} params={params} downloadAction={getStatsEventsType} />
      <Details summary={t('daily_details.title')}>
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <MonitoringEventsByTypeMonthly />
      <DownloadData type={t('monthly_title')} params={{}} downloadAction={getStatsMonthlyConjunctionEventsByObjectType} />
      <Details summary={t('monthly_details.title')}>
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { MonitoringEventsByType };
