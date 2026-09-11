import { isNumber } from 'lodash';

import type {
  TypeOverflightProbability,
  TypeReentryEventReportOut,
} from '@/__generated__/data-contracts';
import { hasLocationAtRiskProbability, isOtherRegionAtRisk } from '@/utils/ReentryRisk';
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

/**
 * A location supplied by the sending service for its own "Risk to <location>"
 * block. `map_src` is the URL of the pre-rendered map image for that location.
 */
export type ReentryLocationAtRisk = TypeOverflightProbability & {
  /** Impact key, e.g. `united_kingdom`, `falkland_islands`. */
  key: string;
  /** Display name. Falls back to the known region name for `key`. */
  name?: string | null;
  map_src: string;
};

/** The UK total is titled plainly, unlike the "(total)" label used in the nation table. */
export const getLocationName = (key: string, name?: string | null): string =>
  name || (key === UNITED_KINGDOM_KEY ? 'United Kingdom' : jsonRegionsMap[key] ?? key);

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

const highestProbability = (location: TypeOverflightProbability): number =>
  Math.max(
    ...[location.fragments_probability, location.atmospheric_probability, location.human_casualty_probability]
      .map(probability => (isNumber(probability) ? probability : 0)),
  );

/**
 * Highest of the three probabilities first. Ties fall back to alphabetical
 * order, except the United Kingdom which leads its tie group.
 */
const byHighestProbabilityThenName = (a: ReentryLocationAtRisk, b: ReentryLocationAtRisk): number => {
  const probabilityA = highestProbability(a);
  const probabilityB = highestProbability(b);

  if (probabilityA !== probabilityB) {
    return probabilityB - probabilityA;
  }

  if (a.key === UNITED_KINGDOM_KEY) {
    return -1;
  }

  if (b.key === UNITED_KINGDOM_KEY) {
    return 1;
  }

  return getLocationName(a.key, a.name).localeCompare(getLocationName(b.key, b.name));
};

/**
 * Locations that get their own "Risk to <location>" block: any of the three
 * probabilities must exceed 0.1% (the UK included, it is not shown by default).
 */
export const getLocationsAtRisk = (locations: ReentryLocationAtRisk[]): ReentryLocationAtRisk[] =>
  locations
    .filter(location =>
      hasLocationAtRiskProbability(
        location.fragments_probability,
        location.atmospheric_probability,
        location.human_casualty_probability,
      ),
    )
    .sort(byHighestProbabilityThenName);

const isPositive = (value: number | null | undefined) => isNumber(value) && value > 0;

/** Every UK nation is always listed, whether or not the report carries data for it. */
const POTENTIAL_IMPACT_NATION_KEYS = [
  'england_nation',
  'scotland_nation',
  'wales_nation',
  'northern_ireland_nation',
] as const;

/**
 * Every airspace/maritime region is always listed. Shanwick can arrive under
 * either key depending on the report, so both are checked.
 */
const POTENTIAL_IMPACT_AIRSPACE_AND_MARITIME_KEYS: readonly (readonly string[])[] = [
  ['uk_navarea'],
  ['london_fir'],
  ['scotland_fir'],
  ['shanwick_oceanic_fir', 'shanwick_airspace'],
];

const toFixedLocations = (
  impact: Record<string, TypeOverflightProbability> | undefined | null,
  keys: readonly (readonly string[])[],
  group: ReentryLocationGroup,
): ReentryLocation[] =>
  keys.map((aliases) => {
    const key = aliases.find(alias => impact?.[alias]) ?? aliases[0]!;
    return {
      ...(impact?.[key] ?? {}),
      key,
      name: jsonRegionsMap[key] ?? key,
      group,
    };
  });

/**
 * "Potential impact by UK nation": the UK total followed by all four nations,
 * always shown regardless of probability.
 */
export const getPotentialImpactByNation = (report: TypeReentryEventReportOut): ReentryLocation[] => [
  {
    ...toUnitedKingdomLocation(report),
    name: jsonRegionsMap[UNITED_KINGDOM_KEY] ?? 'United Kingdom (total)',
  },
  ...toFixedLocations(
    report.impact?.by_nation,
    POTENTIAL_IMPACT_NATION_KEYS.map(key => [key]),
    'uk_mainland',
  ),
];

/**
 * "Potential impact by Airspace and Maritime": all four regions, always shown
 * regardless of probability.
 */
export const getPotentialImpactByAirspaceAndMaritime = (
  report: TypeReentryEventReportOut,
): ReentryLocation[] =>
  toFixedLocations(
    report.impact?.maritime_and_airspace,
    POTENTIAL_IMPACT_AIRSPACE_AND_MARITIME_KEYS,
    'maritime_and_airspace',
  );

/**
 * "Potential impact by Overseas Territories and Crown Dependencies": any
 * territory with a non-zero debris or re-entry probability, alphabetically.
 * Territories that already have their own detailed block are still included.
 */
export const getPotentialImpactByOverseasTerritories = (
  report: TypeReentryEventReportOut,
): ReentryLocation[] =>
  toLocations(
    report.impact?.overseas_territories_and_crown_dependencies,
    'overseas_territories_and_crown_dependencies',
  )
    .filter(location => isPositive(location.fragments_probability) || isPositive(location.atmospheric_probability))
    .sort((a, b) => a.name.localeCompare(b.name));

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
