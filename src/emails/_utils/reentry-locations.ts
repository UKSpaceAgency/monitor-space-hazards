import type {
  TypeOverflightProbability,
  TypeReentryEventReportOut,
} from '@/__generated__/data-contracts';
import { hasLocationAtRiskProbability, hasPositiveProbability } from '@/utils/ReentryRisk';
import {
  jsonRegionsMap,
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
  map_src?: string;
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

/**
 * Locations that get their own "Risk to <location>" block, selected with the
 * same logic as the Locations at Risk table on the website: the United Kingdom
 * when any of its probabilities is > 0%, followed by the Overseas Territories
 * and Crown Dependencies with any probability > 0.1%, in report order.
 * `suppliedLocations` only contributes map images and display-name overrides.
 */
export const getLocationsAtRisk = (
  report: TypeReentryEventReportOut,
  suppliedLocations: ReentryLocationAtRisk[] = [],
): ReentryLocationAtRisk[] => {
  const suppliedByKey = new Map(suppliedLocations.map(location => [location.key, location]));

  const locations: ReentryLocationAtRisk[] = [];

  if (
    hasPositiveProbability(
      report.fragments_probability,
      report.atmospheric_probability,
      report.human_casualty_probability,
    )
  ) {
    const supplied = suppliedByKey.get(UNITED_KINGDOM_KEY);
    locations.push({
      ...toUnitedKingdomLocation(report),
      name: supplied?.name ?? 'United Kingdom',
      map_src: supplied?.map_src,
    });
  }

  const overseasTerritories = report.impact?.overseas_territories_and_crown_dependencies;

  if (overseasTerritories) {
    for (const [key, data] of Object.entries(overseasTerritories)) {
      if (
        hasLocationAtRiskProbability(
          data.fragments_probability,
          data.atmospheric_probability,
          data.human_casualty_probability,
        )
      ) {
        const supplied = suppliedByKey.get(key);
        locations.push({
          ...data,
          key,
          name: supplied?.name ?? jsonRegionsMap[key] ?? key,
          map_src: supplied?.map_src,
        });
      }
    }
  }

  return locations;
};

/**
 * "Potential impact by UK nation": the UK total followed by the nations
 * carried in the report, in the website's fixed nation order.
 */
export const getPotentialImpactByNation = (report: TypeReentryEventReportOut): ReentryLocation[] => [
  {
    ...toUnitedKingdomLocation(report),
    name: jsonRegionsMap[UNITED_KINGDOM_KEY] ?? 'United Kingdom (total)',
  },
  ...sortImpactByNation(report.impact?.by_nation ?? {}).map(([key, data]) => ({
    ...data,
    key,
    name: jsonRegionsMap[key] ?? key,
    group: 'uk_mainland' as const,
  })),
].filter(location =>
  hasPositiveProbability(
    location.fragments_probability,
    location.atmospheric_probability,
    location.human_casualty_probability,
  ));

/**
 * "Potential impact by Airspace and Maritime": the regions carried in the
 * report, in report order — same as the website.
 */
export const getPotentialImpactByAirspaceAndMaritime = (
  report: TypeReentryEventReportOut,
): ReentryLocation[] =>
  toLocations(
    report.impact?.maritime_and_airspace,
    'maritime_and_airspace',
  ).filter(location =>
    hasPositiveProbability(
      location.fragments_probability,
      location.atmospheric_probability,
      location.human_casualty_probability,
    ));

/**
 * "Potential impact by Overseas Territories and Crown Dependencies": every
 * territory with any probability > 0%, sorted alphabetically. The stricter
 * > 0.1% threshold only applies to the "Risk to <location>" blocks, not here.
 */
export const getPotentialImpactByOverseasTerritories = (
  report: TypeReentryEventReportOut,
): ReentryLocation[] =>
  toLocations(
    report.impact?.overseas_territories_and_crown_dependencies,
    'overseas_territories_and_crown_dependencies',
  )
    .filter(location =>
      hasPositiveProbability(
        location.fragments_probability,
        location.atmospheric_probability,
        location.human_casualty_probability,
      ))
    .sort((a, b) => a.key.localeCompare(b.key));
