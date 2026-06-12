import { isNumber } from 'lodash';

import type { TypeReentryEventReportImpact, TypeRisk } from '@/__generated__/data-contracts';

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
): TypeRisk | 'Pending' {
  if (!isNumber(probability)) {
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

export function getReentryFragmentsRisk(
  fragmentsProbability?: number | null,
  impact?: TypeReentryEventReportImpact | null,
): TypeRisk | 'Pending' {
  return getFragmentsRiskFromProbability(
    getReentryFragmentsProbability(fragmentsProbability, impact),
  );
}
