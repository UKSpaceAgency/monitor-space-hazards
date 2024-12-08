import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ReentryFurtherInformation } from '../re-entry/ReentryFurhterInformation';
import { ReentryAlertHistoryDataTable } from './data-table/ReentryAlertHistoryDataTable';
import { ReentryAlertAlertingProcedure } from './ReentryAlertAlertingProcedure';
import { ReentryAlertGuidanceOnResponse } from './ReentryAlertGuidanceOnResponse';
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
};

const ReentryAlertAccordion = ({
  event,
  reports,
}: ReentryAlertAccordionProps) => {
  const t = useTranslations('Accordions.ReentryAlert');

  const impacts = reports && reports[0]?.impact;

  return (
    <Accordion
      id="reentry-event"
      initialItems={[
        {
          id: 'additional_object_details',
          heading: t('additional_object_details'),
          content: (
            <ReentryAlertAdditionalObjectDetailsTable event={event} />
          ),
        },
        ...(impacts?.by_nation
          ? [{
              id: 'potential_impact_uk_nation',
              heading: t('potential_impact_uk_nation'),
              content: (
                <ReentryAlertImpactNation impact={impacts.by_nation} />
              ),
            }]
          : []),
        {
          id: 'potential_impact_uk_region',
          heading: t('potential_impact_uk_region'),
          content: (
            <ReentryAlertImpactRegion england={impacts?.england} ireland={impacts?.northern_ireland} wales={impacts?.wales} scotland={impacts?.scotland} />
          ),
        },
        ...(impacts?.by_nation
          ? [{
              id: 'potential_impact_overseas_territory',
              heading: t('potential_impact_overseas_territory'),
              content: (
                <ReentryAlertImpactOverseas impact={impacts.overseas_territories_and_crown_dependencies} />
              ),
            }]
          : []),
        {
          id: 'guidance_on_response',
          heading: t('guidance_on_response'),
          content: <ReentryAlertGuidanceOnResponse immediateResponse={event.immediateResponse} recoveryAndCleanUp={event.recoveryAndCleanUp} />,
        },
        {
          id: 'liability_for_damages',
          heading: t('liability_for_damages'),
          content: <ReentryAlertLiabilityForDamages licenseCountry={event.licenseCountry} damagesLiability={event.damagesLiability} />,
        },
        {
          id: 'press_attention',
          heading: t('press_attention'),
          content: <ReentryAlertPressAttention pressAttention={event.pressAttention} />,
        },
        {
          id: 'alert_history',
          heading: t('alert_history'),
          content: <ReentryAlertHistoryDataTable shortId={event.shortId} reports={reports} />,
        },
        {
          id: 'risk_thresholds',
          heading: t('risk_thresholds'),
          content: <ReentryAlertRiskThresholds />,
        },
        {
          id: 'alerting_procedure',
          heading: t('alerting_procedure'),
          content: <ReentryAlertAlertingProcedure />,
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
