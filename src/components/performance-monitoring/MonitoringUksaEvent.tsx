import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { MonitoringUksaEventContent } from './MonitoringUksaEventContent';

const MonitoringUksaEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  const params: TypeGetExternalDataPerformanceParams = {
    source_type: ['Manoeuvre Trade Space Plot', 'Analysis'],
    sort_by: 'ingestion_start',
    limit: 50,
    sort_order: 'desc',
  };

  const latestIngestArray = await getExternalDataPerformance({
    ...params,
    limit: 1,
  });

  const latestIngestDate = latestIngestArray[0]?.ingestionEnd ? dayjs(latestIngestArray[0]?.ingestionEnd).format(FORMAT_DATE_TIME) : t('unknown');

  return (
    <>
      <MonitoringUksaEventContent latestIngestDate={latestIngestDate} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </>
  );
};

export { MonitoringUksaEvent };
