import { getTranslations } from 'next-intl/server';

import Details from '@/ui/details/details';

const PerformanceMonitoringObjectsCatalogued = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.objects_catalogued');

  return (
    <div>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringObjectsCatalogued };
