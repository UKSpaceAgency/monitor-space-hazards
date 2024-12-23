import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

const PerformanceMonitoringConjunctionEventAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion');

  return (
    <>
      <h2 className="govuk-heading-l">{t('title')}</h2>
      <Accordion
        id="conjunction-event-accordion"
        initialItems={[
          {
            id: 'conjunctionEventsByType',
            heading: t('conjunction_event_by_type.title'),
            content: <div></div>,
          },
          {
            id: 'objectsCatalogued',
            heading: t('objects_catalogued.title'),
            content: <div></div>,
          },
          {
            id: 'conjunctionEventsByOrganisation',
            heading: t('conjunctions_events_by_organisation.title'),
            content: <div></div>,
          },
          {
            id: 'conjunctionEventsBySatellite',
            heading: t('conjunction_events_by_satellite.title'),
            content: <div></div>,
          },
        ]}
      />
    </>
  );
};

export { PerformanceMonitoringConjunctionEventAccordion };
