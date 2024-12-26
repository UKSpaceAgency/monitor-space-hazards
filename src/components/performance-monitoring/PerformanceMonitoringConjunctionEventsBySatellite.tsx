import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsBySatelliteParams } from '@/__generated__/data-contracts';
import { getStatsEventsBySatellite } from '@/actions/getStatsEventsBySatellite';
import { getUsersMe } from '@/actions/getUsersMe';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

import { PerformanceMonitoringConjunctionsBySatelliteDataTable } from './data-table/PerformanceMonitoringConjunctionEventsBySatelliteDataTable';

const PerformanceMonitoringConjunctionEventsBySatellite = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_satellite');

  const params: TypeGetStatsEventsBySatelliteParams = {};

  const data = await getStatsEventsBySatellite(params);

  const user = await getUsersMe();

  return (
    <div>
      <p className="govuk-body">{t('description')}</p>
      <PerformanceMonitoringConjunctionsBySatelliteDataTable isAnalysist={isAnalysist(user.role)} data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringConjunctionEventsBySatellite };
