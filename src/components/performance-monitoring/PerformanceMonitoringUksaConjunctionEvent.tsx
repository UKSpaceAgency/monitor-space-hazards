import { getTranslations } from 'next-intl/server';

import Details from '@/ui/details/details';

const PerformanceMonitoringUksaConjunctionEvent = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion.uksa');

  return (
    <div>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringUksaConjunctionEvent };
