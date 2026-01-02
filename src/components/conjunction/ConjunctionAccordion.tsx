import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { getConjunctionEventsEventIdSummary } from '@/actions/getConjunctionEventsEventIdSummary';
import { getManoeuvrePlotsByEventEventShortId } from '@/actions/getManoeuvrePlotsByEventEventShortId';
import Accordion from '@/ui/accordion/accordion';

import { ConjunctionCollisionProbabilityChart } from './ConjunctionCollisionProbabilityChart';
import { ConjunctionEventHistory } from './ConjunctionEventHistory';
import { ConjunctionFurtherInformation } from './ConjunctionFurhterInformation';
import { ConjunctionManoeuvreSupport } from './ConjunctionManoeuvreSupport';
import { ConjunctionMissDistanceChart } from './ConjunctionMissDistanceChart';
import { ConjunctionObjectData } from './ConjunctionObjectData';

type ConjunctionAccordionType = {
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  isSpecial: boolean;
};

const ConjunctionAccordion = async ({
  shortId,
  primaryObject,
  secondaryObject,
  isSpecial,
}: ConjunctionAccordionType) => {
  const t = await getTranslations('Conjunction');

  const events = await getConjunctionEventsEventIdSummary({ eventId: shortId });
  const [latestPlot] = await getManoeuvrePlotsByEventEventShortId({ eventShortId: shortId, sort_by: 'cdm_external_id', sort_order: 'desc' });

  return (
    <Accordion
      id="conjunction-accordion"
      initialItems={[
        {
          id: 'pocChart',
          heading: t('Poc_chart.title'),
          content: (
            <ConjunctionCollisionProbabilityChart shortId={shortId} events={events} />
          ),
        },
        ...(latestPlot
          ? [{
              id: 'mtpChart',
              heading: t('Mtp_chart.title'),
              content: (
                <ConjunctionManoeuvreSupport plot={latestPlot} />
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
