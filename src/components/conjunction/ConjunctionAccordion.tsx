import { getTranslations } from 'next-intl/server';

import type { TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import { getConjunctionEventsEventIdSummary } from '@/actions/getConjunctionEventsEventIdSummary';
import { getManoeuvrePlotShortId } from '@/actions/getManoeuvrePlotShortId';
import Accordion from '@/ui/accordion/accordion';

import { ConjunctionCollisionProbabilityChart } from './ConjunctionCollisionProbabilityChart';
import { ConjunctionEventHistory } from './ConjunctionEventHistory';
import { ConjunctionFurtherInformation } from './ConjunctionFurhterInformation';
import { ConjunctionManoeuvreSupport } from './ConjunctionManoeuvreSupport';
import { ConjunctionMissDistanceChart } from './ConjunctionMissDistanceChart';
import { ConjunctionObjectData } from './ConjunctionObjectData';

type ConjunctionAccordionType = {
  shortId: string;
  event: TypeEventSummaryOut;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  isSpecial: boolean;
};

const ConjunctionAccordion = async ({
  shortId,
  event,
  primaryObject,
  secondaryObject,
  isSpecial,
}: ConjunctionAccordionType) => {
  const t = await getTranslations('Conjunction');

  const events = await getConjunctionEventsEventIdSummary({ eventId: shortId });
  const plot = await getManoeuvrePlotShortId(shortId);

  return (
    <Accordion
      id="event-details"
      initialItems={[
        {
          id: 'pocChart',
          heading: t('Poc_chart.title'),
          content: (
            <ConjunctionCollisionProbabilityChart shortId={shortId} events={events} />
          ),
        },
        ...(plot
          ? [{
              id: 'mtpChart',
              heading: t('Mtp_chart.title'),
              content: (
                <ConjunctionManoeuvreSupport plot={plot} />
              ),
            }]
          : []),
        {
          id: 'missDistanceChart',
          heading: t('Miss_distance_chart.title'),
          content: (
            <ConjunctionMissDistanceChart shortId={shortId} events={events} isSpecial={isSpecial} />
          ),
        },
        {
          id: 'objectData',
          heading: t('Object_data.title'),
          content: (
            <ConjunctionObjectData primaryObject={primaryObject} secondaryObject={secondaryObject} />
          ),
        },
        {
          id: 'eventHistory',
          heading: t('Event_history.title'),
          content: (
            <ConjunctionEventHistory
              shortId={shortId}
              event={event}
              events={events}
            />
          ),
        },
        {
          id: 'furtherInformation',
          heading: t('Further_information.title'),
          content: (
            <ConjunctionFurtherInformation />
          ),
        },
      ]}
    />
  );
};

export { ConjunctionAccordion };
