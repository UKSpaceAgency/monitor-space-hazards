import { isNumber } from 'lodash';

import type {
  TypeOverflightProbability,
  TypeReentryEventReportImpact,
  TypeRisk,
} from '@/__generated__/data-contracts';

// Locations at Risk includes an OST when any of its probabilities exceeds
// this threshold (values are fractions, so 0.001 is displayed as 0.1%).
// The UK uses a separate >0 rule — see hasPositiveProbability.
export const LOCATIONS_AT_RISK_PROBABILITY_THRESHOLD = 0.001;

export function hasLocationAtRiskProbability(
  ...probabilities: Array<number | null | undefined>
): boolean {
  return probabilities.some(
    probability => isNumber(probability) && probability > LOCATIONS_AT_RISK_PROBABILITY_THRESHOLD,
  );
}

/** True when any probability is strictly greater than 0 (used for UK in Locations at Risk). */
export function hasPositiveProbability(
  ...probabilities: Array<number | null | undefined>
): boolean {
  return probabilities.some(
    probability => isNumber(probability) && probability > 0,
  );
}

const RISK_SEVERITY: Record<string, number> = {
  'None': 0,
  'Pending': 0,
  'Very low': 1,
  'Low': 2,
  'Medium': 3,
  'High': 4,
};

/**
 * The risk label shown for a location in Locations at Risk: the highest
 * severity of its three risk labels. Null when none are set.
 */
export function getLocationRisk(
  location: Pick<TypeOverflightProbability, 'fragments_risk' | 'atmospheric_risk' | 'human_casualty_risk'>,
): TypeRisk | null {
  const risks = [
    location.fragments_risk,
    location.atmospheric_risk,
    location.human_casualty_risk,
  ].filter((risk): risk is TypeRisk => Boolean(risk));

  if (risks.length === 0) {
    return null;
  }

  return risks.reduce((highest, risk) =>
    (RISK_SEVERITY[risk] ?? 0) > (RISK_SEVERITY[highest] ?? 0) ? risk : highest,
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
    return (fragmentsRisk ?? 'None') as TypeRisk;
  } else {
    if (objectName?.toLowerCase().includes('starlink')) {
      return 'Very low';
    } else {
      return 'Pending';
    }
  }
}
