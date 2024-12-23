import { getTranslations } from 'next-intl/server';

import Details from '@/ui/details/details';

const PerformanceMonitoringConjunctionEventsByOrganisation = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_events_by_organisation');

  return (
    <div>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringConjunctionEventsByOrganisation };
