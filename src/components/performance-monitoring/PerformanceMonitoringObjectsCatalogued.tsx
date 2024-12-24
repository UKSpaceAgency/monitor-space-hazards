import { getTranslations } from 'next-intl/server';

import { getStatsObjectsTracked } from '@/actions/getStatsObjectsTracked';
import Details from '@/ui/details/details';

const PerformanceMonitoringObjectsCatalogued = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.objects_catalogued');

  const data = await getStatsObjectsTracked();

  return (
    <div>
      <h3 className="govuk-heading-l">{t('heading')}</h3>
      <div className="flex justify-between flex-col lg:flex-row">
        {data.map(item => (
          <div key={item.objectType}>
            <h4 className="govuk-heading-l govuk-!-margin-bottom-2">
              {item.count}
            </h4>
            <p className="govuk-body">{item.objectType}</p>
          </div>
        ))}
      </div>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringObjectsCatalogued };
