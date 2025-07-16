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
import { ReentryAlertImpactOverseas } from './ReentryAlertImpactOverseas';
import { ReentryAlertImpactRegion } from './ReentryAlertImpactRegion';
import { ReentryAlertLiabilityForDamages } from './ReentryAlertLiabilityForDamages';
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
    <Accordion
      id="reentry-event"
      initialItems={[
        {
          id: 'additional_object_details',
          heading: t('additional_object_details'),
          content: (
            <ReentryAlertAdditionalObjectDetailsTable event={event} dataPdf={t('additional_object_details')} />
          ),
        },
        ...(impacts?.by_nation
          ? [{
              id: 'potential_impact_uk_nation',
              heading: t('potential_impact_uk_nation'),
              content: (
                <ReentryAlertImpactNation impact={impacts.by_nation} dataPdf={t('potential_impact_uk_nation')} />
              ),
            }]
          : []),
        {
          id: 'potential_impact_uk_region',
          heading: t('potential_impact_uk_region'),
          content: (
            <ReentryAlertImpactRegion england={impacts?.england} ireland={impacts?.northern_ireland} wales={impacts?.wales} scotland={impacts?.scotland} dataPdf={t('potential_impact_uk_region')} />
          ),
        },
        ...(impacts?.overseas_territories_and_crown_dependencies
          ? [{
              id: 'potential_impact_overseas_territory',
              heading: t('potential_impact_overseas_territory'),
              content: (
                <ReentryAlertImpactOverseas impact={impacts.overseas_territories_and_crown_dependencies} dataPdf={t('potential_impact_overseas_territory')} />
              ),
            }]
          : []),
        ...(impacts?.maritime_and_airspace
          ? [{
              id: 'potential_impact_airspace_and_maritime',
              heading: t('potential_impact_airspace_and_maritime'),
              content: (
                <ReentryAlertImpactAirspaceAndMaritime impact={impacts.maritime_and_airspace} dataPdf={t('potential_impact_airspace_and_maritime')} />
              ),
            }]
          : []),
        {
          id: 'guidance_on_response',
          heading: t('guidance_on_response'),
          content: <ReentryAlertGuidanceOnResponse risk={lastReport?.fragmentsRisk} immediateResponse={searchParams?.immediate_response ?? event.immediateResponse} dataPdf={t('guidance_on_response')} />,
        },
        {
          id: 'guidance_if_object_impacts_uk_interests',
          heading: t('guidance_if_object_impacts_uk_interests'),
          content: <ReentryAlertGuidanceIfObjectImpactsUkInterests recoveryAndCleanUp={searchParams?.recovery_and_clean_up ?? event.recoveryAndCleanUp} dataPdf={t('guidance_if_object_impacts_uk_interests')} />,
        },
        {
          id: 'liability_for_damages',
          heading: t('liability_for_damages'),
          content: <ReentryAlertLiabilityForDamages licenseCountry={event.licenseCountry} damagesLiability={searchParams?.damages_liability ?? event.damagesLiability} dataPdf={t('liability_for_damages')} />,
        },
        {
          id: 'press_attention',
          heading: t('press_attention'),
          content: <ReentryAlertPressAttention pressAttention={searchParams?.press_attention ?? event.pressAttention} dataPdf={t('press_attention')} />,
        },
        {
          id: 'alert_history',
          heading: t('alert_history'),
          content: <ReentryAlertHistoryDataTable shortId={event.shortId} reports={reports} dataPdf={t('alert_history')} />,
        },
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
  );
};

export { ReentryAlertAccordion };
