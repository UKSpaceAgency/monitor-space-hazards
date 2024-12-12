'use client';
import { useTranslations } from 'next-intl';

import type { TypeDataSourcesOut, TypeEventSummaryOut, TypeSatelliteOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ConjunctionCollisionProbabilityChart } from './ConjunctionCollisionProbabilityChart';
import { ConjunctionEventHistory } from './ConjunctionEventHistory';
import { ConjunctionFurtherInformation } from './ConjunctionFurhterInformation';
import { ConjunctionManoeuvreSupport } from './ConjunctionManoeuvreSupport';
import { ConjunctionMissDistanceChart } from './ConjunctionMissDistanceChart';
import { ConjunctionObjectData } from './ConjunctionObjectData';

type ConjunctionAccordionType = {
  id: string;
  haveMtp: boolean;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  events: TypeEventSummaryOut[];
  event: TypeEventSummaryOut;
  dataSources: TypeDataSourcesOut;
  handleDownloadData: () => Promise<unknown>;
};

const ConjunctionAccordion = ({
  id,
  haveMtp,
  primaryObject,
  secondaryObject,
  events,
  event,
  dataSources,
  handleDownloadData,
}: ConjunctionAccordionType) => {
  const t = useTranslations('Accordions.Conjunction');

  return (
    <Accordion
      id="event-details"
      initialItems={[
        {
          id: 'pocChart',
          heading: t('poc_chart.title'),
          content: (
            <ConjunctionCollisionProbabilityChart id={id} />
          ),
        },
        ...(haveMtp
          ? [{
              id: 'mtpChart',
              heading: t('mtp_chart.title'),
              content: (
                <ConjunctionManoeuvreSupport />
              ),
            }]
          : []),
        {
          id: 'missDistanceChart',
          heading: t('miss_distance_chart.title'),
          content: (
            <ConjunctionMissDistanceChart id={id} />
          ),
        },
        {
          id: 'objectData',
          heading: t('object_data.title'),
          content: (
            <ConjunctionObjectData primaryObject={primaryObject} secondaryObject={secondaryObject} />
          ),
        },
        {
          id: 'eventHistory',
          heading: t('event_history.title'),
          content: (
            <ConjunctionEventHistory
              events={events}
              event={event}
              dataSources={dataSources}
              handleDownloadData={handleDownloadData}
            />
          ),
        },
        {
          id: 'furtherInformation',
          heading: t('further_information.title'),
          content: (
            <ConjunctionFurtherInformation />
          ),
        },
      ]}
    />
  );
};

export { ConjunctionAccordion };
