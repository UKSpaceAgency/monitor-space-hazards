import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { SatelliteInformation } from '../satellite/SatelliteInformation';
import { ReentryEventHistoryDataTable } from './data-table/ReentryEventHistoryDataTable';
import { ReentryFurtherInformation } from './ReentryFurhterInformation';

type ReentryAccordionProps = {
  noradId: string;
  object: TypeSatelliteOut;
};

const ReentryAccordion = ({
  noradId,
  object,
}: ReentryAccordionProps) => {
  const t = useTranslations('Accordions.Reentry');

  return (
    <Accordion
      id="reentry-event"
      initialItems={[
        {
          id: 'object_data',
          heading: t('object_data'),
          content: (
            <SatelliteInformation object={object} />
          ),
        },
        {
          id: 'history',
          heading: t('history'),
          content: (
            <ReentryEventHistoryDataTable noradId={noradId} />
          ),
        },
        {
          id: 'further_information',
          heading: t('further_information'),
          content: (
            <ReentryFurtherInformation />
          ),
        },
      ]}
    />
  );
};

export { ReentryAccordion };
