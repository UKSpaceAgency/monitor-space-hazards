import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent, TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { FragmentationHistoryDataTable } from './data-table/FragmentationHistoryDataTable';
import { ActualFragmentData } from './FragmentationActualFragmentData';
import { FragmentationAdditionalRisk } from './FragmentationAdditionalRisk';
import { FragmentationAlertingProcedure } from './FragmentationAlertingProcedure';
import { FragmentationAnalysisOfPotentialEventCause } from './FragmentationAnalysisOfPotentialEventCause';
import { FragmentationFurtherInformations } from './FragmentationFurtherInformations';
import { FragmentationGuidanceOnResponse } from './FragmentationGuidanceOnResponse';
import { FragmentationObjectDetails } from './FragmentationObjectDetails';
import { FragmentationPressAttention } from './FragmentationPressAttention';
import { FragmentationRiskThresholds } from './FragmentationRiskThresholds';

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
    <>
      <h2 data-anchor="information" className="govuk-heading-l">{t('event_details')}</h2>
      <Accordion
        id="fragmentation-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'object_details',
            heading: t('object_details'),
            content: (
              <FragmentationObjectDetails report={report} />
            ),
          },
          {
            id: 'fragmentation_history',
            heading: t('fragmentation_history'),
            content: (
              <FragmentationHistoryDataTable shortId={event.short_id} dataPdf={t('fragmentation_history')} />
            ),
          },
          {
            id: 'actual_fragment_data',
            heading: t('actual_fragment_data'),
            content: (
              <ActualFragmentData shortId={event.short_id} modelledFragments={report.modelled_fragments ?? 0} knownFragments={report.known_fragments ?? 0} dataPdf={t('actual_fragment_data')} />
            ),
          },
          {
            id: 'analysis_of_potential_event_cause',
            heading: t('analysis_of_potential_event_cause'),
            content: (
              <FragmentationAnalysisOfPotentialEventCause comment={event.orbital_analyst_comment} />
            ),
          },
        ]}
      />
      <h2 data-anchor="potential-impact" className="govuk-heading-l">{t('potential_impact')}</h2>
      <Accordion
        id="fragmentation-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'additional_risk',
            heading: t('additional_risk'),
            content: (
              <FragmentationAdditionalRisk spaceflightComment={event.spaceflight_risk_comment} ukComment={event.uk_response_comment} presignedUrl={report.presigned_url as string} dataPdf={t('additional_risk')} />
            ),
          },
        ]}
      />
      <h2 data-anchor="guidance" className="govuk-heading-l">{t('guidance')}</h2>
      <Accordion
        id="fragmentation-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'guidance_on_response',
            heading: t('guidance_on_response'),
            content: (
              <FragmentationGuidanceOnResponse comment={event.uk_response_comment} dataPdf={t('guidance_on_response')} />
            ),
          },
          {
            id: 'press_attention',
            heading: t('press_attention'),
            content: (
              <FragmentationPressAttention comment={report.press_attention_comment} dataPdf={t('press_attention')} />
            ),
          },
        ]}
      />
      <h2 data-anchor="additional-information" className="govuk-heading-l">{t('additional_information')}</h2>
      <Accordion
        id="fragmentation-additional-information"
        addAnchor={false}
        initialItems={[
          {
            id: 'risk_thresholds',
            heading: t('risk_thresholds'),
            content: <FragmentationRiskThresholds dataPdf={t('risk_thresholds')} />,
          },
          {
            id: 'alerting_procedure',
            heading: t('alerting_procedure'),
            content: <FragmentationAlertingProcedure dataPdf={t('alerting_procedure')} />,
          },
          {
            id: 'further_information',
            heading: t('further_information'),
            content: <FragmentationFurtherInformations dataPdf={t('further_information')} />,
          },
        ]}
      />
    </>

  );
};

export { FragmentationAccordion };
