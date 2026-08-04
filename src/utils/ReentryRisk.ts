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

type GetReentryFragmentsRisk = {
  fragmentsRisk?: TypeRisk | null;
  objectName?: string | null;
  alertType?: TypeAlertType[] | null;
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
  alertType,
}: GetReentryFragmentsRisk) {
  const hasNoAlertType = !alertType?.length;

  if (hasNoAlertType) {
    if (fragmentsRisk) {
      return fragmentsRisk;
    } else {
      if (objectName?.toLowerCase().includes('starlink')) {
        return 'Very low';
      } else {
        return null;
      }
    }
  } else {
    return 'closedown';
  }
}
