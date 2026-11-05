import type { TypeAlertType } from '@/__generated__/data-contracts';

/**
 * alert_type enums:
 * - 'alert' (level 1; formerly 'standard')
 * - 'warning' (level 2; formerly 'priority')
 * - 'closedown' becomes 'closedown_known' / 'closedown_unknown' (re-entries only)
 *
 * Helpers accept both current and legacy string values where still present
 * in transitional payloads.
 */

const hasAlertType = (alertTypes: TypeAlertType[] | null | undefined, ...values: string[]) =>
  !!alertTypes?.some(type => values.includes(type));

export const isStandardAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  hasAlertType(alertTypes, 'alert', 'standard');

export const isPriorityAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  hasAlertType(alertTypes, 'warning', 'priority');

export const isUkLicensedAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.includes('uk-licensed');

export const isClosedownAlertType = (alertTypes?: TypeAlertType[] | null): boolean =>
  !!alertTypes?.some(type => type.startsWith('closedown'));

type UiAlertChosenOption = 'standard' | 'priority' | 'uk-licensed';

/** Map form/UI chosen_options (standard/priority) to API write values (alert/warning). */
export function toAlertSettingsChosenOptions(
  options: Array<'standard' | 'priority'>,
): Array<'alert' | 'warning'>;
export function toAlertSettingsChosenOptions(
  options: Array<'standard' | 'priority' | 'uk-licensed'>,
): Array<'alert' | 'warning' | 'uk-licensed'>;
export function toAlertSettingsChosenOptions(
  options: UiAlertChosenOption[],
): Array<'alert' | 'warning' | 'uk-licensed'> {
  return options.map((option) => {
    if (option === 'standard') {
      return 'alert';
    }
    if (option === 'priority') {
      return 'warning';
    }
    return option;
  });
}
