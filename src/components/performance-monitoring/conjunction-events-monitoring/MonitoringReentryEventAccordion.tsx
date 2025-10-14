import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringReentryEventsByType } from './MonitoringReentryEventsByType';

const MonitoringReentryEventAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.reentry_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="reentryAccordionTitle">{t('title')}</h2>
      <Accordion
        id="reentry-event-accordion"
        dynamic
        initialItems={[
          {
            id: 'reentryEventsByType',
            heading: t('reentry_event_by_type.title'),
            content: <MonitoringReentryEventsByType />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringReentryEventAccordion };
