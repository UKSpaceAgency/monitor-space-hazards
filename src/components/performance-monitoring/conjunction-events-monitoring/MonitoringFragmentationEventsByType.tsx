import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsTypeParams } from '@/__generated__/data-contracts';
import { getStatsFragmentationEventsType } from '@/actions/getStatsFragmentationEventsType';
import { getStatsMonthlyFragmentationEventsByObjectType } from '@/actions/getStatsMonthlyFragmentationEventsByObjectType';
import { DownloadData } from '@/components/DownloadData';
import { FORMAT_API_DATE_TIME, TODAY_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { MonitoringFragmentationEventsByTypeDaily } from './MonitoringFragmentationEventsByTypeDaily';
import { MonitoringFragmentationEventsByTypeMonthly } from './MonitoringFragmentationEventsByTypeMonthly';

const MonitoringFragmentationEventsByType = async () => {
  const t = await getTranslations('Performance_monitoring.fragmentation_accordion.fragmentation_event_by_type');

  const params: TypeGetStatsEventsTypeParams = {
    start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  };

  return (
    <>
      <h3 className="govuk-heading-s">{t('daily_title')}</h3>
      <MonitoringFragmentationEventsByTypeDaily />
      <DownloadData params={params} downloadAction={getStatsFragmentationEventsType} ariaLabel="Daily Fragmentation events by type" />
      <Details summary={t.rich('daily_details.title')}>
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <MonitoringFragmentationEventsByTypeMonthly />
      <DownloadData params={{}} downloadAction={getStatsMonthlyFragmentationEventsByObjectType} ariaLabel="Monthly Fragmentation events by type" />
      <Details summary={t.rich('monthly_details.title')}>
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { MonitoringFragmentationEventsByType };
