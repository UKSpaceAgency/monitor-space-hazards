import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringObjectsCatalogued } from '../conjunction-events-monitoring/MonitoringObjectsCatalogued';
import { CdmIngests } from './CdmIngests';
import { ObjectDataIngests } from './ObjectDataIngests';
import { TipIngests } from './TipIngests';

const MonitoringAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.performance_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="performanceAccordionTitle">{t('title')}</h2>
      <Accordion
        id="performance-monitoring-accordion"
        dynamic
        initialItems={[
          {
            id: 'cdmIngests',
            heading: t('cdm_ingests.title'),
            content: <CdmIngests />,
          },
          {
            id: 'tipIngests',
            heading: t('tip_ingests.title'),
            content: <TipIngests />,
          },
          {
            id: 'objectDataIngests',
            heading: t('object_data_ingests.title'),
            content: <ObjectDataIngests />,
          },
          {
            id: 'objectsCatalogued',
            heading: t('objects_catalogued.title'),
            content: <MonitoringObjectsCatalogued />,
          },
          // {
          //   id: 'notificationsSent',
          //   heading: t('notifications_sent.title'),
          //   content: <NotificationsSent />,
          // },
          // {
          //   id: 'uksa',
          //   heading: t('uksa.title'),
          //   content: <UksaAnalyses />,
          // },
        ]}
      />
    </>
  );
};

export { MonitoringAccordion };
