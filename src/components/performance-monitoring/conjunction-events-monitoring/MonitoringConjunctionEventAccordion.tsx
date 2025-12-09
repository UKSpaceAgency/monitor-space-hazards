import { getTranslations } from 'next-intl/server';

import Accordion from '@/ui/accordion/accordion';

import { MonitoringConjunctionEventsByType } from './MonitoringConjunctionEventsByType';
import { MonitoringEventsByOrganisation } from './MonitoringEventsByOrganisation';
import { MonitoringEventsByProbabilityOfCollision } from './MonitoringEventsByProbabilityOfCollision';
import { MonitoringEventsBySatellite } from './MonitoringEventsBySatellite';
import { MonitoringObjectsCatalogued } from './MonitoringObjectsCatalogued';

const MonitoringConjunctionEventAccordion = async () => {
  const t = await getTranslations('Performance_monitoring.conjunction_accordion');

  return (
    <>
      <h2 className="govuk-heading-l" id="conjunctionAccordionTitle">{t('title')}</h2>
      <Accordion
        id="conjunction-event-accordion"
        dynamic
        initialItems={[
          {
            id: 'conjunctionEventsByType',
            heading: t('conjunction_event_by_type.title'),
            content: <MonitoringConjunctionEventsByType />,
          },
          {
            id: 'conjunctionEventsByProbablityOfColliision',
            heading: t('conjunction_events_by_probability_of_collision.title'),
            content: <MonitoringEventsByProbabilityOfCollision />,
          },
          {
            id: 'objectsCatalogued',
            heading: t('objects_catalogued.title'),
            content: <MonitoringObjectsCatalogued />,
          },
          {
            id: 'conjunctionEventsByOrganisation',
            heading: t('conjunction_events_by_organisation.title'),
            content: <MonitoringEventsByOrganisation />,
          },
          {
            id: 'conjunctionEventsBySatellite',
            heading: t('conjunction_events_by_satellite.title'),
            content: <MonitoringEventsBySatellite />,
          },
        ]}
      />
    </>
  );
};

export { MonitoringConjunctionEventAccordion };
