import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { PerformanceMonitoringCdmIngests } from './PerformanceMonitoringCdmIngests';
import { PerformanceMonitoringNotificationsSent } from './PerformanceMonitoringNotificationsSent';
import { PerformanceMonitoringObjectDataIngests } from './PerformanceMonitoringObjectDataIngests';
import { PerformanceMonitoringUksaConjunctionEvent } from './PerformanceMonitoringUksaConjunctionEvent';

const PerformanceMonitoringAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion');

  return (
    <>
      <h2 className="govuk-heading-l">{t('title')}</h2>
      <Accordion
        id="performance-monitoring-accordion"
        initialItems={[
          {
            id: 'cdmIngests',
            heading: t('cdm_ingests.title'),
            content: <PerformanceMonitoringCdmIngests />,
          },
          {
            id: 'objectDataIngests',
            heading: t('object_data_ingests.title'),
            content: <PerformanceMonitoringObjectDataIngests />,
          },
          {
            id: 'notificationsSent',
            heading: t('notifications_sent.title'),
            content: <PerformanceMonitoringNotificationsSent />,
          },
          {
            id: 'uksa',
            heading: t('uksa.title'),
            content: <PerformanceMonitoringUksaConjunctionEvent />,
          },
        ]}
      />
    </>
  );
};

export { PerformanceMonitoringAccordion };