import { isNumber } from 'lodash';

import type {
  TypeOverflightProbability,
  TypeReentryEventReportOut,
} from '@/__generated__/data-contracts';
import { isOtherRegionAtRisk, isReportableLocation } from '@/utils/ReentryRisk';
import {
  jsonRegionsMap,
  sortImpactByAirspaceAndMaritime,
  sortImpactByNation,
} from '@/utils/Regions';

export const UNITED_KINGDOM_KEY = 'united_kingdom';

export type ReentryLocationGroup
  = | 'uk_mainland'
  | 'maritime_and_airspace'
  | 'overseas_territories_and_crown_dependencies';

export type ReentryLocation = TypeOverflightProbability & {
  key: string;
  name: string;
  group: ReentryLocationGroup;
};

const toLocations = (
  impact: Record<string, TypeOverflightProbability> | undefined | null,
  group: ReentryLocationGroup,
): ReentryLocation[] =>
  Object.entries(impact ?? {}).map(([key, data]) => ({
    ...data,
    key,
    name: jsonRegionsMap[key] ?? key,
    group,
  }));

/**
 * The probability fields on the report itself describe the United Kingdom as a
 * whole, rather than any entry inside the impact breakdown.
 */
const toUnitedKingdomLocation = (report: TypeReentryEventReportOut): ReentryLocation => ({
  key: UNITED_KINGDOM_KEY,
  name: 'United Kingdom',
  group: 'uk_mainland',
  fragments_probability: report.fragments_probability,
  fragments_risk: report.fragments_risk,
  atmospheric_probability: report.atmospheric_probability,
  atmospheric_risk: report.atmospheric_risk,
  human_casualty_probability: report.human_casualty_probability,
  human_casualty_risk: report.human_casualty_risk,
  overflight_time: report.overflight_time,
});

const allLocations = (report: TypeReentryEventReportOut): ReentryLocation[] => [
  toUnitedKingdomLocation(report),
  ...toLocations(report.impact?.by_nation, 'uk_mainland'),
  ...toLocations(report.impact?.maritime_and_airspace, 'maritime_and_airspace'),
  ...toLocations(
    report.impact?.overseas_territories_and_crown_dependencies,
    'overseas_territories_and_crown_dependencies',
  ),
];

/**
 * Highest debris impact probability first. Equal probabilities fall back to
 * alphabetical order, except the United Kingdom which leads its tie group.
 */
const byProbabilityThenName = (a: ReentryLocation, b: ReentryLocation): number => {
  const probabilityA = isNumber(a.fragments_probability) ? a.fragments_probability : 0;
  const probabilityB = isNumber(b.fragments_probability) ? b.fragments_probability : 0;

  if (probabilityA !== probabilityB) {
    return probabilityB - probabilityA;
  }

  if (a.key === UNITED_KINGDOM_KEY) {
    return -1;
  }

  if (b.key === UNITED_KINGDOM_KEY) {
    return 1;
  }

  return a.name.localeCompare(b.name);
};

/**
 * Locations that warrant their own detailed block, ordered for display.
 */
export const getReportableLocations = (report: TypeReentryEventReportOut): ReentryLocation[] =>
  allLocations(report)
    .filter(location => isReportableLocation(location.fragments_probability))
    .sort(byProbabilityThenName);

/**
 * Locations with a non-zero but below-threshold risk, grouped and ordered the
 * same way as the Monitor Space Hazards website.
 */
export const getOtherRegionsAtRisk = (report: TypeReentryEventReportOut) => {
  const impact = report.impact;

  const filterAtRisk = (locations: ReentryLocation[]) =>
    locations.filter(location => isOtherRegionAtRisk(location.fragments_probability));

  const ukMainland = filterAtRisk(
    sortImpactByNation(impact?.by_nation ?? {}).map(([key, data]) => ({
      ...data,
      key,
      name: jsonRegionsMap[key] ?? key,
      group: 'uk_mainland' as const,
    })),
  );

  const maritimeAndAirspace = filterAtRisk(
    sortImpactByAirspaceAndMaritime(impact?.maritime_and_airspace ?? {}).map(([key, data]) => ({
      ...data,
      key,
      name: jsonRegionsMap[key] ?? key,
      group: 'maritime_and_airspace' as const,
    })),
  );

  const overseasTerritories = filterAtRisk(
    toLocations(
      impact?.overseas_territories_and_crown_dependencies,
      'overseas_territories_and_crown_dependencies',
    ),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return { ukMainland, maritimeAndAirspace, overseasTerritories };
};
