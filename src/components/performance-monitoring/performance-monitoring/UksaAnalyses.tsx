import { getTranslations } from 'next-intl/server';

import type { TypeGetExternalDataPerformanceParams } from '@/__generated__/data-contracts';
import { getExternalDataPerformance } from '@/actions/getExternalDataPerformance';
import { getStatsAnalysisAndManoeuvreSupport } from '@/actions/getStatsAnalysisAndManoeuvreSupport';
import { getStatsMonthlyAnalyses } from '@/actions/getStatsMonthlyAnalyses';
import { DownloadData } from '@/components/DownloadData';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';

import { UksaAnalysesDaily } from './UksaAnalysesDaily';
import { UksaAnalysesMonthly } from './UksaAnalysesMonthly';

const UksaAnalyses = async () => {
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
      <h3 className="govuk-heading-s">{t('daily_title')}</h3>
      <UksaAnalysesDaily latestIngestDate={latestIngestDate} />
      <DownloadData type={t('daily_title')} params={params} downloadAction={getStatsAnalysisAndManoeuvreSupport} ariaLabel="Daily analyses and manoeuvre support details" />
      <Details summary={t('daily_title')} aria-label="Daily analyses and manoeuvre support details">
        {t('daily_details.content')}
      </Details>
      <h3 className="govuk-heading-s">{t('monthly_title')}</h3>
      <UksaAnalysesMonthly />
      <DownloadData type={t('monthly_title')} params={{}} downloadAction={getStatsMonthlyAnalyses} ariaLabel="Monthly analyses and manoeuvre support details" />
      <Details summary={t('monthly_details.title')} aria-label="Monthly analyses and manoeuvre support details">
        {t('monthly_details.content')}
      </Details>
    </>
  );
};

export { UksaAnalyses };
