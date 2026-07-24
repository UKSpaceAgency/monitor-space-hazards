import { isNumber } from 'lodash';

import type {
  TypeAlertType,
  TypeReentryEventReportImpact,
  TypeRisk,
} from '@/__generated__/data-contracts';

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

type GetReentryFragmentsRiskOptions = {
  impact?: TypeReentryEventReportImpact | null;
  fragmentsRisk?: TypeRisk | null;
  alertType?: TypeAlertType[] | null;
};

/**
 * Resolve the risk label to display for a re-entry.
 *
 * Analysis can exist without an alert (below threshold → empty alert_type).
 * In that case, show the risk label when present so the event is not stuck on Pending.
 * Closedown is excluded from that empty-alert fallback.
 */
export function getReentryFragmentsRisk(
  fragmentsProbability?: number | null,
  object_name?: string | null,
  options?: GetReentryFragmentsRiskOptions,
): TypeRisk | 'Pending' {
  const { impact, fragmentsRisk, alertType } = options ?? {};
  const probability = getReentryFragmentsProbability(fragmentsProbability, impact);
  const isClosedown = Boolean(alertType?.includes('closedown'));
  const hasNoAlertType = !alertType?.length;
  const hasAnalysedRisk = Boolean(fragmentsRisk && fragmentsRisk !== 'Pending');

  // Prefer threshold mapping when analysis produced a probability
  if (isNumber(probability)) {
    return getFragmentsRiskFromProbability(probability, object_name);
  }

  // Analysed but below alert threshold: empty alert_type with a risk label
  if (!isClosedown && hasNoAlertType && hasAnalysedRisk) {
    return fragmentsRisk as TypeRisk;
  }

  if (hasAnalysedRisk) {
    return fragmentsRisk as TypeRisk;
  }

  return getFragmentsRiskFromProbability(probability, object_name);
}
