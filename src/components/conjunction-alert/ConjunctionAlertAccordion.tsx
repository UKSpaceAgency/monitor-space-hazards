import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeUniqueEventOut, TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ConjunctionAlertAdditionalEventDetails } from './ConjunctionAlertAdditionalEventDetails';
import { ConjunctionAlertAdditionalRisk } from './ConjunctionAlertAdditionalRisk';
import { ConjunctionAlertFurtherInformation } from './ConjunctionAlertFurtherInformation';
import { ConjunctionAlertGuidanceOnResponse } from './ConjunctionAlertGuidanceOnResponse';
import { ConjunctionAlertOperatorView } from './ConjunctionAlertOperatorView';
import { ConjunctionAlertPotentialImpact } from './ConjunctionAlertPotentialImpact';
import { ConjunctionAlertPressAttention } from './ConjunctionAlertPressAttention';
import { ConjunctionAlertRiskThresholds } from './ConjunctionAlertRiskThresholds';
import { ConjunctionAlertThresholds } from './ConjunctionAlertThresholds';
import { ConjunctionAlertHistoryDataTable } from './data-table/ConjunctionAlertHistoryDataTable';

type ConjunctionAlertAccordionProps = {
  event: TypeUniqueEventOut;
  report: TypeConjunctionReportOut;
  reports?: TypeConjunctionReportOut[];
  searchParams?: TypeUniqueEventUpdateTextFieldsIn;
};

const ConjunctionAlertAccordion = ({
  event,
  report,
  reports,
  searchParams,
}: ConjunctionAlertAccordionProps) => {
  const t = useTranslations('Conjunction_alert.accordion');

  return (
    <>
      <h2 data-anchor="information" className="govuk-heading-l">{t('event_details')}</h2>
      <Accordion
        id="conjunction-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'additional_event_details',
            heading: t('additional_event_details'),
            content: (
              <ConjunctionAlertAdditionalEventDetails report={report} dataPdf={t('additional_event_details')} />
            ),
          },
          {
            id: 'conjunction_event_history',
            heading: t('conjunction_event_history'),
            content: <ConjunctionAlertHistoryDataTable shortId={event.shortId} reports={reports} dataPdf={t('conjunction_event_history')} />,
          },
          {
            id: 'operator_view',
            heading: t('operator_view'),
            content: <ConjunctionAlertOperatorView shortId={event.shortId} />,
          },
        ]}
      />
      <h2 data-anchor="potential-impact" className="govuk-heading-l">{t('potential_impact')}</h2>
      <Accordion
        id="conjunction-potential-impact"
        addAnchor={false}
        initialItems={[
          {
            id: 'potential_impact_of_event',
            heading: t('potential_impact_of_event'),
            content: (
              <ConjunctionAlertPotentialImpact immediateImpactComment={searchParams?.immediate_impact_comment ?? event.immediateImpactComment} shortTermImpactComment={searchParams?.short_term_impact_comment ?? event.shortTermImpactComment} longTermImpactComment={searchParams?.long_term_impact_comment ?? event.longTermImpactComment} dataPdf={t('potential_impact_of_event')} />
            ),
          },
          {
            id: 'additional_risk',
            heading: t('additional_risk'),
            content: <ConjunctionAlertAdditionalRisk presignedUrl={report.presignedUrl as string} dataPdf={t('additional_risk')} />,
          },
        ]}
      />
      <h2 data-anchor="guidance" className="govuk-heading-l">{t('guidance')}</h2>
      <Accordion
        id="conjunction-guidance"
        addAnchor={false}
        initialItems={[
          {
            id: 'guidance_on_response',
            heading: t('guidance_on_response'),
            content: (
              <ConjunctionAlertGuidanceOnResponse ukResponseComment={searchParams?.uk_response_comment ?? event.ukResponseComment} dataPdf={t('guidance_on_response')} />
            ),
          },
          {
            id: 'press_attention',
            heading: t('press_attention'),
            content: <ConjunctionAlertPressAttention pressAttentionComment={searchParams?.press_attention_comment ?? event.pressAttentionComment} dataPdf={t('press_attention')} />,
          },
        ]}
      />
      <h2 data-anchor="additional-information" className="govuk-heading-l">{t('additional_information')}</h2>
      <Accordion
        id="conjunction-additional-information"
        addAnchor={false}
        initialItems={[
          {
            id: 'risk_thresholds',
            heading: t('risk_thresholds'),
            content: <ConjunctionAlertRiskThresholds dataPdf={t('risk_thresholds')} />,
          },
          {
            id: 'alert_thresholds',
            heading: t('alert_thresholds'),
            content: <ConjunctionAlertThresholds dataPdf={t('alert_thresholds')} />,
          },
          {
            id: 'further_information',
            heading: t('further_information'),
            content: <ConjunctionAlertFurtherInformation dataPdf={t('further_information')} />,
          },
        ]}
      />
    </>
  );
};

export { ConjunctionAlertAccordion };
