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
 * Each block needs its own rendered map. The token carries the location key so the
 * sending service never has to reproduce the order the blocks are rendered in.
 */
const mapToken = (key: string) => `{{LOCATION_MAP_${key}.src}}`;

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
      {locations.map(location => (
        <LocationRisk key={location.key} location={location} mapSrc={mapToken(location.key)} />
      ))}
    </>
  );
};
