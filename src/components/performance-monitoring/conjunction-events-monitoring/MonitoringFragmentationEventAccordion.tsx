import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringFragmentationEventsByType } from './MonitoringFragmentationEventsByType';

const MonitoringFragmentationEventAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.fragmentation_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="reentryAccordionTitle">{t('title')}</h2>
      <Accordion
        id="fragmentation-event-accordion"
        dynamic
        initialItems={[
          {
            id: 'fragmentationEventsByType',
            heading: t('fragmentation_event_by_type.title'),
            content: <MonitoringFragmentationEventsByType />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringFragmentationEventAccordion };
