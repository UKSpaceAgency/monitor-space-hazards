import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentNavigation } from '@/components/ContentNavigation';
import { MonitoringEventAccordion } from '@/components/performance-monitoring/conjunction-events-monitoring/MonitoringEventAccordion';
import { MonitoringAccordion } from '@/components/performance-monitoring/performance-monitoring/MonitoringAccordion';
import { MonitoringServiceUsageAccordion } from '@/components/performance-monitoring/service-usage/MonitoringServiceUsageAccordion';

export const metadata: Metadata = {
  title: 'Performance monitoring and statistics',
};

export default async function PerformanceMonitoring() {
  const t = await getTranslations('Performance_monitoring');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <ContentNavigation
        title={t('performance_monitoring')}
        internalTitle={[
          {
            text: t('service_usage'),
            index: 5,
          },
          {
            text: t('conjunction_event_and_organisation_data'),
            index: 6,
          },
        ]}
        className="mb-8"
      />

      <MonitoringAccordion />
      <MonitoringServiceUsageAccordion />
      <MonitoringEventAccordion />
    </div>
  );
}
