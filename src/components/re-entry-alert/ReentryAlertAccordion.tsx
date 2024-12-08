import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ReentryAlertImpactNation } from './ReentryAlertImpactNation';
import { ReentryAlertImpactOverseas } from './ReentryAlertImpactOverseas';
import { ReentryAlertImpactRegion } from './ReentryAlertImpactRegion';
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
      ]}
    />
  );
};

export { ReentryAlertAccordion };
