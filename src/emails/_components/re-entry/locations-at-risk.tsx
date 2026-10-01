import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { ReentryLocationAtRisk } from '@/emails/_utils/reentry-locations';

import { LocationRisk } from './location-risk';

type ReentryLocationsAtRiskProps = {
  locations: ReentryLocationAtRisk[];
  report: TypeReentryEventReportOut;
};

export const ReentryLocationsAtRisk = ({ locations }: ReentryLocationsAtRiskProps) => {
  if (locations.length === 0) {
    return null;
  }

  return (
    <>
      {locations.map(location => (
        <LocationRisk key={location.key} location={location} />
      ))}
    </>
  );
};
