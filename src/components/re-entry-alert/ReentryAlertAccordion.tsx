import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventPatch, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ReentryFurtherInformation } from '../re-entry/ReentryFurhterInformation';
import { ReentryAlertHistoryDataTable } from './data-table/ReentryAlertHistoryDataTable';
import { ReentryAlertAlertingProcedure } from './ReentryAlertAlertingProcedure';
import { ReentryAlertGuidanceIfObjectImpactsUkInterests } from './ReentryAlertGuidanceIfObjectImpactsUkInterests';
import { ReentryAlertGuidanceOnResponse } from './ReentryAlertGuidanceOnResponse';
import { ReentryAlertImpactAirspaceAndMaritime } from './ReentryAlertImpactAirspaceAndMaritime';
import { ReentryAlertImpactNation } from './ReentryAlertImpactNation';
import { ReentryAlertPressAttention } from './ReentryAlertPressAttention';
import { ReentryAlertRiskThresholds } from './ReentryAlertRiskThresholds';
import { ReentryAlertAdditionalObjectDetailsTable } from './tables/ReentryAlertAdditionalObjectDetailsTable';

type ReentryAlertAccordionProps = {
  event: TypeReentryEventOut;
  reports?: TypeReentryEventReportOut[];
  lastReport?: TypeReentryEventReportOut;
  searchParams?: TypeReentryEventPatch;
};

const ReentryAlertAccordion = ({
  event,
  reports,
  lastReport,
  searchParams,
}: ReentryAlertAccordionProps) => {
  const t = useTranslations('Reentry_alert.accordion');

  const impacts = lastReport?.impact;

  return (
    <>
      <h2 data-anchor="information" className="govuk-heading-l">{t('event_details')}</h2>
      <Accordion
        id="reentry-event-details"
        addAnchor={false}
        initialItems={[
          {
            id: 'additional_object_details',
            heading: t('additional_object_details'),
            content: (
              <ReentryAlertAdditionalObjectDetailsTable event={event} dataPdf={t('additional_object_details')} />
            ),
          },
          {
            id: 'alert_history',
            heading: t('alert_history'),
            content: <ReentryAlertHistoryDataTable shortId={event.shortId} reports={reports} dataPdf={t('alert_history')} />,
          },
        ]}
      />
      <h2 data-anchor="potential-impact" className="govuk-heading-l">{t('potential_impact')}</h2>
      <Accordion
        id="reentry-potential-impact"
        addAnchor={false}
        initialItems={[
          ...(impacts?.by_nation
            ? [{
                id: 'potential_impact_uk_nation',
                heading: t('potential_impact_uk_nation'),
                content: (
                  <ReentryAlertImpactNation impact={impacts.by_nation} dataPdf={t('potential_impact_uk_nation')} />
                ),
              }]
            : []),
          // {
          //   id: 'potential_impact_uk_region',
          //   heading: t('potential_impact_uk_region'),
          //   content: (
          //     <ReentryAlertImpactRegion england={impacts?.england} ireland={impacts?.northern_ireland} wales={impacts?.wales} scotland={impacts?.scotland} dataPdf={t('potential_impact_uk_region')} />
          //   ),
          // },
          // ...(impacts?.overseas_territories_and_crown_dependencies
          //   ? [{
          //       id: 'potential_impact_overseas_territory',
          //       heading: t('potential_impact_overseas_territory'),
          //       content: (
          //         <ReentryAlertImpactOverseas impact={impacts.overseas_territories_and_crown_dependencies} dataPdf={t('potential_impact_overseas_territory')} />
          //       ),
          //     }]
          //   : []),
          ...(impacts?.maritime_and_airspace
            ? [{
                id: 'potential_impact_airspace_and_maritime',
                heading: t('potential_impact_airspace_and_maritime'),
                content: (
                  <ReentryAlertImpactAirspaceAndMaritime impact={impacts.maritime_and_airspace} dataPdf={t('potential_impact_airspace_and_maritime')} />
                ),
              }]
            : []),
        ]}
      />
      <h2 data-anchor="guidance" className="govuk-heading-l">{t('guidance')}</h2>
      <Accordion
        id="reentry-guidance"
        addAnchor={false}
        initialItems={[
          {
            id: 'guidance_on_response',
            heading: t('guidance_on_response'),
            content: <ReentryAlertGuidanceOnResponse risk={lastReport?.fragmentsRisk} immediateResponseComment={searchParams?.immediate_response_comment ?? event.immediateResponseComment} dataPdf={t('guidance_on_response')} />,
          },
          {
            id: 'guidance_if_object_impacts_uk_interests',
            heading: t('guidance_if_object_impacts_uk_interests'),
            content: <ReentryAlertGuidanceIfObjectImpactsUkInterests ukResponseComment={searchParams?.uk_response_comment ?? event.ukResponseComment} dataPdf={t('guidance_if_object_impacts_uk_interests')} />,
          },
          // {
          //   id: 'liability_for_damages',
          //   heading: t('liability_for_damages'),
          //   content: <ReentryAlertLiabilityForDamages licenseCountry={event.licenseCountry} damagesLiabilityComment={searchParams?.damages_liability_comment ?? event.damagesLiabilityComment} dataPdf={t('liability_for_damages')} />,
          // },
          {
            id: 'press_attention',
            heading: t('press_attention'),
            content: <ReentryAlertPressAttention pressAttentionComment={searchParams?.press_attention_comment ?? event.pressAttentionComment} dataPdf={t('press_attention')} />,
          },
        ]}
      />
      <h2 data-anchor="additional-information" className="govuk-heading-l">{t('additional_information')}</h2>
      <Accordion
        id="reentry-additional-information"
        addAnchor={false}
        initialItems={[
          {
            id: 'risk_thresholds',
            heading: t('risk_thresholds'),
            content: <ReentryAlertRiskThresholds dataPdf={t('risk_thresholds')} />,
          },
          {
            id: 'alerting_procedure',
            heading: t('alerting_procedure'),
            content: <ReentryAlertAlertingProcedure dataPdf={t('alerting_procedure')} />,
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

    </>

  );
};

export { ReentryAlertAccordion };
