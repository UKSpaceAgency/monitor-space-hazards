import { getTranslations } from 'next-intl/server';

import type { TypeGetStatsEventsByOrganizationParams } from '@/__generated__/data-contracts';
import { getStatsEventsByOrganization } from '@/actions/getStatsEventsByOrganization';
import Details from '@/ui/details/details';

import { PerformanceMonitoringConjunctionsByOrganisationDataTable } from './data-table/PerformanceMonitoringConjunctionEventsByOrganisationDataTable';

const PerformanceMonitoringConjunctionEventsByOrganisation = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_organisation');

  const params: TypeGetStatsEventsByOrganizationParams = {};

  const data = await getStatsEventsByOrganization(params);

  return (
    <div>
      <PerformanceMonitoringConjunctionsByOrganisationDataTable data={data} params={params} />
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringConjunctionEventsByOrganisation };
