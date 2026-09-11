import { Column, Row, Section as EmailSection } from '@react-email/components';
import clsx from 'clsx';
import { isNumber } from 'lodash';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { ReentryLocation, ReentryLocationGroup } from '@/emails/_utils/reentry-locations';
import {
  getPotentialImpactByAirspaceAndMaritime,
  getPotentialImpactByNation,
  getPotentialImpactByOverseasTerritories,
} from '@/emails/_utils/reentry-locations';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { roundedPercentage } from '@/utils/Math';

import { Section } from '../section';
import { Text } from '../text';

type ReentryPotentialImpactProps = {
  report: TypeReentryEventReportOut;
  group: ReentryLocationGroup;
};

const formatProbability = (value: number | null | undefined) =>
  isNumber(value) ? roundedPercentage(value) : '-';

const GROUPS: Record<
  ReentryLocationGroup,
  {
    titleKey: 'by_nation_title' | 'by_airspace_and_maritime_title' | 'by_overseas_territories_title';
    descriptionKey?: 'by_overseas_territories_description';
    getLocations: (report: TypeReentryEventReportOut) => ReentryLocation[];
  }
> = {
  uk_mainland: {
    titleKey: 'by_nation_title',
    getLocations: getPotentialImpactByNation,
  },
  maritime_and_airspace: {
    titleKey: 'by_airspace_and_maritime_title',
    getLocations: getPotentialImpactByAirspaceAndMaritime,
  },
  overseas_territories_and_crown_dependencies: {
    titleKey: 'by_overseas_territories_title',
    descriptionKey: 'by_overseas_territories_description',
    getLocations: getPotentialImpactByOverseasTerritories,
  },
};

export const ReentryPotentialImpact = ({ report, group }: ReentryPotentialImpactProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Potential_impact' });

  const { titleKey, descriptionKey, getLocations } = GROUPS[group];
  const locations = getLocations(report);

  return (
    <Section title={t(titleKey)}>
      {descriptionKey && <Text>{t(descriptionKey)}</Text>}
      <EmailSection className="!w-full">
        <Row className="!w-full">
          <Column className="w-1/2 p-2 text-sm font-bold align-top">{t('location')}</Column>
          <Column className="w-1/4 p-2 text-sm font-bold align-top">{t('probability_of_debris_impact')}</Column>
          <Column className="w-1/4 p-2 text-sm font-bold align-top">{t('probability_of_reentry')}</Column>
        </Row>
        {locations.length === 0
          ? <Text className="m-0 p-2">{t('empty')}</Text>
          : locations.map((location, index) => (
              <Row
                key={location.key}
                className={clsx('!w-full', { 'bg-[#f0f0f0]': index % 2 === 0 })}
              >
                <Column className="w-1/2 p-2 text-sm font-bold align-top">{location.name}</Column>
                <Column className="w-1/4 p-2 text-sm align-top">
                  {formatProbability(location.fragments_probability)}
                </Column>
                <Column className="w-1/4 p-2 text-sm align-top">
                  {formatProbability(location.atmospheric_probability)}
                </Column>
              </Row>
            ))}
      </EmailSection>
    </Section>
  );
};
