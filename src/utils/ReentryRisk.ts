import { isNumber } from 'lodash';

import type {
  TypeReentryEventReportImpact,
  TypeRisk,
} from '@/__generated__/data-contracts';

// Locations at Risk includes a location when any of its probabilities exceeds
// this threshold (values are fractions, so 0.0001 is displayed as 0.01%)
export const LOCATIONS_AT_RISK_PROBABILITY_THRESHOLD = 0.0001;

// A location gets its own "Risk to <location>" block in the re-entry email once
// its debris impact probability reaches 0.1%. Anything non-zero below that is
// summarised under "Other Regions At Risk" instead.
export const REPORTABLE_LOCATION_PROBABILITY_THRESHOLD = 0.001;

export function isReportableLocation(fragmentsProbability: number | null | undefined): boolean {
  return isNumber(fragmentsProbability) && fragmentsProbability >= REPORTABLE_LOCATION_PROBABILITY_THRESHOLD;
}

export function isOtherRegionAtRisk(fragmentsProbability: number | null | undefined): boolean {
  return isNumber(fragmentsProbability)
    && fragmentsProbability > 0
    && fragmentsProbability < REPORTABLE_LOCATION_PROBABILITY_THRESHOLD;
}

/**
 * Risk banding for a debris impact probability expressed as a fraction:
 * Very low < 0.1%, Low 0.1%-1%, Medium 1%-5%, High > 5%.
 */
export function getRiskLevelFromFraction(probability: number | null | undefined): TypeRisk | null {
  if (!isNumber(probability)) {
    return null;
  }

  if (probability === 0) {
    return 'None';
  }

  if (probability < 0.001) {
    return 'Very low';
  }

  if (probability <= 0.01) {
    return 'Low';
  }

  if (probability <= 0.05) {
    return 'Medium';
  }

  return 'High';
}

export function hasLocationAtRiskProbability(
  ...probabilities: Array<number | null | undefined>
): boolean {
  return probabilities.some(
    probability => isNumber(probability) && probability > LOCATIONS_AT_RISK_PROBABILITY_THRESHOLD,
  );
}

export function getMaxUkAndCdotsFragmentsProbability(
  impact?: TypeReentryEventReportImpact | null,
): number | null {
  if (!impact) {
    return null;
  }

  const probabilities = [
    ...Object.values(impact.by_nation ?? {}),
    ...Object.values(impact.overseas_territories_and_crown_dependencies ?? {}),
  ]
    .map(region => region.fragments_probability)
    .filter((probability): probability is number => isNumber(probability));

  return probabilities.length > 0 ? Math.max(...probabilities) : null;
}

export function getFragmentsRiskFromProbability(
  probability: number | null | undefined,
  object_name?: string | null,
): TypeRisk | 'Pending' {
  if (!isNumber(probability)) {
    if (object_name?.toLowerCase().includes('starlink')) {
      return 'Very low';
    }
    return 'Pending';
  }

  if (probability === 0) {
    return 'None';
  }

  if (probability < 0.1) {
    return 'Very low';
  }

  if (probability < 1) {
    return 'Low';
  }

  if (probability <= 5) {
    return 'Medium';
  }

  return 'High';
}

export function getReentryFragmentsProbability(
  fragmentsProbability?: number | null,
  impact?: TypeReentryEventReportImpact | null,
): number | null {
  const maxFromImpact = getMaxUkAndCdotsFragmentsProbability(impact);

  if (isNumber(maxFromImpact)) {
    return maxFromImpact;
  }

  return isNumber(fragmentsProbability) ? fragmentsProbability : null;
}

type GetReentryFragmentsRisk = {
  fragmentsRisk?: string | null;
  objectName?: string | null;
};

/**
 * Resolve the risk label to display for a re-entry.
 *
 * Analysis can exist without an alert (below threshold → empty alert_type).
 * In that case, show the risk label when present so the event is not stuck on Pending.
 * Closedown is excluded from that empty-alert fallback.
 */
export function getReentryFragmentsRisk({
  fragmentsRisk,
  objectName,
}: GetReentryFragmentsRisk): TypeRisk {
  if (fragmentsRisk) {
    if (objectName?.toLowerCase().includes('starlink')) {
      return 'Very low';
    } else {
      return 'Pending';
    }
  } else {
    return (fragmentsRisk ?? 'None') as TypeRisk;
  }
}
