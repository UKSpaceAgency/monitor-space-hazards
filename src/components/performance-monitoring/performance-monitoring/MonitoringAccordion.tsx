import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { CdmIngests } from './CdmIngests';
import { NotificationsSent } from './NotificationsSent';
import { ObjectDataIngests } from './ObjectDataIngests';
import { UksaAnalyses } from './UksaAnalyses';

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
            content: <CdmIngests />,
          },
          // {
          //   id: 'tipIngests',
          //   heading: t('tip_ingests.title'),
          //   content: <TipIngests />,
          // },
          {
            id: 'objectDataIngests',
            heading: t('object_data_ingests.title'),
            content: <ObjectDataIngests />,
          },
          {
            id: 'notificationsSent',
            heading: t('notifications_sent.title'),
            content: <NotificationsSent title={t('notifications_sent.title')} />,
          },
          {
            id: 'uksa',
            heading: t('uksa.title'),
            content: <UksaAnalyses />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringAccordion };
