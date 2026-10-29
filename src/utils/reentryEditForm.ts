import type { TypeLevelledComment, TypeLevelledCommentOut, TypeReentryEventPatch } from '@/__generated__/data-contracts';

/** Flat form / URL search-param shape used by the re-entry edit wizard. */
export type ReentryAlertEditFormValues = {
  closed_comment?: string;
  executive_summary_comment?: string;
  executive_summary_comment_level_1?: string;
  executive_summary_comment_level_2?: string;
  damages_liability_comment?: string;
  uk_response_comment?: string;
  press_attention_comment?: string;
};

const emptyToNull = (value?: string | null): string | null => {
  if (value == null || value.trim() === '') {
    return null;
  }
  return value;
};

/**
 * Build executive_summary_comment for PATCH.
 *
 * - Shared text only → plain string (or null)
 * - Level overrides when provided → `{ _default?, level_1?, level_2? }`
 * - Empty level fields are omitted so existing overrides are left alone
 */
const toExecutiveSummaryComment = (
  data: ReentryAlertEditFormValues,
): string | null | TypeLevelledComment => {
  const defaultText = emptyToNull(data.executive_summary_comment);
  const level1 = emptyToNull(data.executive_summary_comment_level_1);
  const level2 = emptyToNull(data.executive_summary_comment_level_2);

  if (level1 == null && level2 == null) {
    return defaultText;
  }

  const comment: TypeLevelledComment = {};
  if (defaultText != null) {
    comment._default = defaultText;
  }
  if (level1 != null) {
    comment.level_1 = level1;
  }
  if (level2 != null) {
    comment.level_2 = level2;
  }
  return comment;
};

/** Maps flat edit-form fields to the PATCH body (LevelledComment for executive summary). */
export const mapReentryEditFormToPatch = (
  data: ReentryAlertEditFormValues | Record<string, string>,
): TypeReentryEventPatch => {
  const formData = data as ReentryAlertEditFormValues;

  return {
    closed_comment: emptyToNull(formData.closed_comment),
    executive_summary_comment: toExecutiveSummaryComment(formData),
    damages_liability_comment: emptyToNull(formData.damages_liability_comment),
    uk_response_comment: emptyToNull(formData.uk_response_comment),
    press_attention_comment: emptyToNull(formData.press_attention_comment),
  };
};

/**
 * Normalize API comment fields that may be a plain string or LevelledComment.
 * Prefer `_default` when the value is levelled.
 */
export const getCommentString = (
  value?: unknown,
): string | null | undefined => {
  if (value == null) {
    return value as null | undefined;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && value !== null && '_default' in value) {
    const defaultValue = (value as TypeLevelledComment)._default;
    return defaultValue ?? null;
  }
  return null;
};

/** Prefill a Level 1 / Level 2 edit field from LevelledComment or *_comment_levels. */
export const getCommentLevel = (
  value: unknown,
  level: 'level_1' | 'level_2',
): string => {
  if (value == null || typeof value === 'string') {
    return '';
  }
  if (typeof value === 'object' && value !== null && level in value) {
    const levelValue = (value as TypeLevelledComment | TypeLevelledCommentOut)[level];
    return typeof levelValue === 'string' ? levelValue : '';
  }
  return '';
};
