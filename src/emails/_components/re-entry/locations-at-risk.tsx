import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { getReportableLocations } from '@/emails/_utils/reentry-locations';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Section } from '../section';
import { Text } from '../text';
import { LocationRisk } from './location-risk';

type ReentryLocationsAtRiskProps = {
  report: TypeReentryEventReportOut;
};

/**
 * Each block needs its own rendered map. The sending service substitutes these
 * tokens in the same order the blocks are rendered here.
 */
const mapToken = (index: number) => `{{LOCATION_MAP_${index + 1}.src}}`;

export const ReentryLocationsAtRisk = ({ report }: ReentryLocationsAtRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });

  const locations = getReportableLocations(report);

  if (locations.length === 0) {
    return (
      <Section title={t('empty_title')}>
        <Text className="mb-0">{t('empty')}</Text>
      </Section>
    );
  }

  return (
    <>
      {locations.map((location, index) => (
        <LocationRisk key={location.key} location={location} mapSrc={mapToken(index)} />
      ))}
    </>
  );
};
