import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringCdmIngests } from './MonitoringCdmIngests';
import { MonitoringNotificationsSent } from './MonitoringNotificationsSent';
import { MonitoringObjectDataIngests } from './MonitoringObjectDataIngests';
import { MonitoringUksaEvent } from './MonitoringUksaEvent';

const MonitoringAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="performanceAccordionTitle">{t('title')}</h2>
      <Accordion
        id="performance-monitoring-accordion"
        initialItems={[
          {
            id: 'cdmIngests',
            heading: t('cdm_ingests.title'),
            content: <MonitoringCdmIngests />,
          },
          {
            id: 'objectDataIngests',
            heading: t('object_data_ingests.title'),
            content: <MonitoringObjectDataIngests />,
          },
          {
            id: 'notificationsSent',
            heading: t('notifications_sent.title'),
            content: <MonitoringNotificationsSent />,
          },
          {
            id: 'uksa',
            heading: t('uksa.title'),
            content: <MonitoringUksaEvent />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringAccordion };
