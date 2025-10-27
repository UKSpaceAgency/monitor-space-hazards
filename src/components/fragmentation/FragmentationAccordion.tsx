import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent, TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { FragmentationAdditionalRisk } from './FragmentationAdditionalRisk';
import { FragmentationAnalysisOfPotentialEventCause } from './FragmentationAnalysisOfPotentialEventCause';
import { FragmentationEventDetails } from './FragmentationEventDetails';
import { FragmentationFurtherInformation } from './FragmentationFurtherInformation';
import { FragmentationGuidanceOnResponse } from './FragmentationGuidanceOnResponse';
import { FragmentationObjectDetails } from './FragmentationObjectDetails';

type FragmentationAccordionProps = {
  event: TypeFragmentationEvent;
  report: TypeFragmentationReportOut;
};

const FragmentationAccordion = ({
  event,
  report,
}: FragmentationAccordionProps) => {
  const t = useTranslations('Fragmentation.accordion');

  return (
    <Accordion
      id="reentry-event-details"
      initialItems={[
        {
          id: 'event_details',
          heading: t('event_details'),
          content: (
            <FragmentationEventDetails event={event} report={report} />
          ),
        },
        {
          id: 'additional_risk',
          heading: t('additional_risk'),
          content: (
            <FragmentationAdditionalRisk presignedUrl={report.presigned_url as string} dataPdf={t('additional_risk')} />
          ),
        },
        {
          id: 'analysis_of_potential_event_cause',
          heading: t('analysis_of_potential_event_cause'),
          content: (
            <FragmentationAnalysisOfPotentialEventCause report={report} />
          ),
        },
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
            <FragmentationObjectDetails report={report} />
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
