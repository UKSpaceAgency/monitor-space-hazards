import { useTranslations } from 'next-intl';

import type { TypeReentryEventWithLevelsOut } from '@/__generated__/data-contracts';
import { getCommentLevel, getCommentString } from '@/utils/reentryEditForm';

import type { EventAlertFormField } from '../event-alert-edit/EventAlertEditForm';
import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type ReentryAlertEditFormProps = {
  event: TypeReentryEventWithLevelsOut;
};

const ReentryAlertEditForm = ({ event }: ReentryAlertEditFormProps) => {
  const tForm = useTranslations('Forms.Edit_alert');

  const executiveSummaryLevels = event.executive_summary_comment_levels;

  const formFields: EventAlertFormField[] = [{
    id: 'closed_comment',
    ariaLabel: tForm('type.closed_comment'),
    name: tForm('type.closed_comment'),
    defaultValue: getCommentString(event.closed_comment) ?? '',
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_closed_comment'),
  }, {
    id: 'executive_summary_comment',
    ariaLabel: tForm('type.executive_summary_comment'),
    name: tForm('type.executive_summary_comment'),
    defaultValue: getCommentString(executiveSummaryLevels) ?? getCommentString(event.executive_summary_comment) ?? '',
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_json_field', { field: 'executive_summary_comment' }),
  }, {
    id: 'executive_summary_comment_level_1',
    ariaLabel: tForm('type.executive_summary_comment_level_1'),
    name: tForm('type.executive_summary_comment_level_1'),
    defaultValue: getCommentLevel(executiveSummaryLevels, 'level_1'),
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_json_field_level', {
      field: 'executive_summary_comment',
      level: 1,
    }),
  }, {
    id: 'executive_summary_comment_level_2',
    ariaLabel: tForm('type.executive_summary_comment_level_2'),
    name: tForm('type.executive_summary_comment_level_2'),
    defaultValue: getCommentLevel(executiveSummaryLevels, 'level_2'),
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_json_field_level', {
      field: 'executive_summary_comment',
      level: 2,
    }),
  }, {
    id: 'damages_liability_comment',
    ariaLabel: tForm('type.damages_liability_comment'),
    name: tForm('type.damages_liability_comment'),
    defaultValue: getCommentString(event.damages_liability_comment) ?? '',
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_json_field', { field: 'damages_liability_comment' }),
  }, {
    id: 'uk_response_comment',
    ariaLabel: tForm('type.uk_response_comment'),
    name: tForm('type.uk_response_comment'),
    defaultValue: getCommentString(event.uk_response_comment) ?? '',
    type: 'text',
    labelMode: 'add_to',
    help: tForm('hint_add_uk_response'),
  }, {
    id: 'press_attention_comment',
    ariaLabel: tForm('type.press_attention_comment'),
    name: tForm('type.press_attention_comment'),
    defaultValue: getCommentString(event.press_attention_comment) ?? '',
    type: 'text',
    labelMode: 'edit',
    help: tForm('hint_replace_json_field', { field: 'press_attention_comment' }),
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { ReentryAlertEditForm };
