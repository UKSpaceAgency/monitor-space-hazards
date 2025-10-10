import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent, TypeFragmentationReport } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { FragmentationFurtherInformation } from './FragmentationFurtherInformation';
import { FragmentationGuidanceOnResponse } from './FragmentationGuidanceOnResponse';
import { FragmentationObjectDetails } from './FragmentationObjectDetails';

type FragmentationAccordionProps = {
  event: TypeFragmentationEvent;
  reports?: TypeFragmentationReport[];
  lastReport?: TypeFragmentationReport;
};

const FragmentationAccordion = ({
  event,
}: FragmentationAccordionProps) => {
  const t = useTranslations('Fragmentation.accordion');

  return (
    <Accordion
      id="reentry-event-details"
      initialItems={[
        {
          id: 'guidance_on_response',
          heading: t('guidance_on_response'),
          content: (
            <FragmentationGuidanceOnResponse dataPdf={t('guidance_on_response')} />
          ),
        },
        {
          id: 'object_details',
          heading: t('object_details'),
          content: (
            <FragmentationObjectDetails noradId={event.primary_object_norad_id!} dataPdf={t('object_details')} />
          ),
        },
        {
          id: 'further_information',
          heading: t('further_information'),
          content: (
            <FragmentationFurtherInformation dataPdf={t('further_information')} />
          ),
        },
      ]}
    />
  );
};

export { FragmentationAccordion };
