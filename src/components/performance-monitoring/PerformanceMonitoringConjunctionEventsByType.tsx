import { getTranslations } from 'next-intl/server';

import Details from '@/ui/details/details';

const PerformanceMonitoringConjunctionEventsByType = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion.conjunction_event_by_type');

  return (
    <div>
      <p className="govuk-body">{t('description')}</p>
      <Details summary={t('details.title')}>
        {t('details.content')}
      </Details>
    </div>
  );
};

export { PerformanceMonitoringConjunctionEventsByType };
