import { getTranslations } from 'next-intl/server';

import { getStatsObjectsTracked } from '@/actions/getStatsObjectsTracked';
import Details from '@/ui/details/details';

const MonitoringObjectsCatalogued = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.objects_catalogued');

  const data = await getStatsObjectsTracked();

  return (
    <div>
      <h3 className="govuk-heading-l">{t('heading')}</h3>
      <ul className="flex justify-between flex-col md:flex-row">
        {data.map(item => (
          <li key={item.objectType}>
            <p className="govuk-heading-l govuk-!-margin-bottom-2">
              {item.count}
            </p>
            <p className="govuk-body">{item.objectType}</p>
          </li>
        ))}
      </ul>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { MonitoringObjectsCatalogued };
