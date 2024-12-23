import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { PerformanceMonitoringConjunctionEventsByOrganisation } from './PerformanceMonitoringConjunctionEventsByOrganisation';
import { PerformanceMonitoringConjunctionEventsBySatellite } from './PerformanceMonitoringConjunctionEventsBySatellite';
import { PerformanceMonitoringConjunctionEventsByType } from './PerformanceMonitoringConjunctionEventsByType';
import { PerformanceMonitoringObjectsCatalogued } from './PerformanceMonitoringObjectsCatalogued';

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
            content: <PerformanceMonitoringConjunctionEventsByType />,
          },
          {
            id: 'objectsCatalogued',
            heading: t('objects_catalogued.title'),
            content: <PerformanceMonitoringObjectsCatalogued />,
          },
          {
            id: 'conjunctionEventsByOrganisation',
            heading: t('conjunction_events_by_organisation.title'),
            content: <PerformanceMonitoringConjunctionEventsByOrganisation />,
          },
          {
            id: 'conjunctionEventsBySatellite',
            heading: t('conjunction_events_by_satellite.title'),
            content: <PerformanceMonitoringConjunctionEventsBySatellite />,
          },
        ]}
      />
    </>
  );
};

export { PerformanceMonitoringConjunctionEventAccordion };
