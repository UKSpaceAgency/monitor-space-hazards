import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeUniqueEventOut, TypeUniqueEventUpdateTextFieldsIn } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ConjunctionAlertAdditionalEventDetails } from './ConjunctionAlertAdditionalEventDetails';
import { ConjunctionAlertAdditionalRisk } from './ConjunctionAlertAdditionalRisk';
import { ConjunctionAlertFurtherInformation } from './ConjunctionAlertFurtherInformation';
import { ConjunctionAlertGuidanceOnResponse } from './ConjunctionAlertGuidanceOnResponse';
import { ConjunctionAlertOperatorView } from './ConjunctionAlertOperatorView';
import { ConjunctionAlertPotentialImpact } from './ConjunctionAlertPotentialImpact';
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
    <Accordion
      id="reentry-event"
      initialItems={[
        {
          id: 'additional_event_details',
          heading: t('additional_event_details'),
          content: (
            <ConjunctionAlertAdditionalEventDetails report={report} dataPdf={t('additional_event_details')} />
          ),
        },
        {
          id: 'potential_impact_of_event',
          heading: t('potential_impact_of_event'),
          content: (
            <ConjunctionAlertPotentialImpact immediateImpactComment={searchParams?.immediate_impact_comment ?? event.immediateImpactComment} shortTermImpactComment={searchParams?.short_term_impact_comment ?? event.shortTermImpactComment} longTermImpactComment={searchParams?.long_term_impact_comment ?? event.longTermImpactComment} dataPdf={t('potential_impact_of_event')} />
          ),
        },
        {
          id: 'guidance_on_response',
          heading: t('guidance_on_response'),
          content: (
            <ConjunctionAlertGuidanceOnResponse ukResponseComment={searchParams?.uk_response_comment ?? event.ukResponseComment} pressAttentionComment={searchParams?.press_attention_comment ?? event.pressAttentionComment} dataPdf={t('guidance_on_response')} />
          ),
        },
        {
          id: 'additional_risk',
          heading: t('additional_risk'),
          content: <ConjunctionAlertAdditionalRisk presignedUrl={report.presignedUrl as string} dataPdf={t('additional_risk')} />,
        },
        {
          id: 'operator_view',
          heading: t('operator_view'),
          content: <ConjunctionAlertOperatorView shortId={event.shortId} />,
        },
        {
          id: 'conjunction_event_history',
          heading: t('conjunction_event_history'),
          content: <ConjunctionAlertHistoryDataTable shortId={event.shortId} reports={reports} dataPdf={t('conjunction_event_history')} />,
        },
        {
          id: 'alert_thresholds',
          heading: t('alert_thresholds'),
          content: <ConjunctionAlertThresholds dataPdf={t('alert_thresholds')} />,
        },
        {
          id: 'risk_thresholds',
          heading: t('risk_thresholds'),
          content: <ConjunctionAlertRiskThresholds dataPdf={t('risk_thresholds')} />,
        },
        {
          id: 'further_information',
          heading: t('further_information'),
          content: <ConjunctionAlertFurtherInformation dataPdf={t('further_information')} />,
        },
      ]}
    />
  );
};

export { ConjunctionAlertAccordion };
