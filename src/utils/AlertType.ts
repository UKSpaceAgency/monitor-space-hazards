import type { TypeAlertType } from '@/__generated__/data-contracts';

/**
 * alert_type enums are transitioning on the backend:
 * - 'alert' (level 1) is superseded by 'standard'
 * - 'warning' (level 2) is superseded by 'priority'
 * - 'closedown' becomes 'closedown_known' / 'closedown_unknown' (re-entries only)
 *
 * These helpers accept both legacy and new values so categorisation
 * and distribution logic keeps working during the transition.
 */

export const isStandardAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.some(type => type === 'standard' || type === 'alert');

export const isPriorityAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.some(type => type === 'priority' || type === 'warning');

export const isUkLicensedAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.includes('uk-licensed');

export const isClosedownAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.some(type => type.startsWith('closedown'));
