import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentNavigation } from '@/components/ContentNavigation';
import { PerformanceMonitoringConjunctionEventAccordion } from '@/components/performance-monitoring/CojunctionEventAccordion';
import { PerformanceMonitoringAccordion } from '@/components/performance-monitoring/PerformanceMonitoringAccordion';

export const metadata: Metadata = {
  title: 'Performance monitoring and statistics',
};

export default async function PerformanceMonitoring() {
  const t = await getTranslations('Performance_monitoring');

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <ContentNavigation title={t('performance_monitoring')} className="mb-8" />

      <PerformanceMonitoringAccordion />
      <PerformanceMonitoringConjunctionEventAccordion />
    </div>
  );
}
