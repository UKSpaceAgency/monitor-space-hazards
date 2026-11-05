import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { ReentryLocationAtRisk } from '@/emails/_utils/reentry-locations';
import { createEmailTranslator } from '@/emails/_utils/utils';

import { Text } from '../text';
import { LocationRisk } from './location-risk';

type ReentryLocationsAtRiskProps = {
  locations: ReentryLocationAtRisk[];
  report: TypeReentryEventReportOut;
};

export const ReentryLocationsAtRisk = ({ locations }: ReentryLocationsAtRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });

  if (locations.length === 0) {
    return <Text>{t('no_individual_locations')}</Text>;
  }

  return (
    <>
      {locations.map(location => (
        <LocationRisk key={location.key} location={location} />
      ))}
    </>
  );
};
