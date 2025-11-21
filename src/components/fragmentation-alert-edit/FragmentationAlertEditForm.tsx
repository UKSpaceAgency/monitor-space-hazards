import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';

import type { EventAlertFormField } from '../event-alert-edit/EventAlertEditForm';
import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type FragmentationAlertEditFormProps = {
  event: TypeFragmentationEvent;
};

const FragmentationAlertEditForm = ({ event }: FragmentationAlertEditFormProps) => {
  const tForm = useTranslations('Forms.Edit_alert');

  const formFields: EventAlertFormField[] = [{
    id: 'closed_comment',
    ariaLabel: tForm('type.closed_comment'),
    name: tForm('type.closed_comment'),
    defaultValue: event.closed_comment ?? '',
    type: 'text',
  }, {
    id: 'executive_summary_comment',
    ariaLabel: tForm('type.exec_summary_addition'),
    name: tForm('type.exec_summary_addition'),
    defaultValue: event.executive_summary_comment ?? '',
    type: 'text',
  }, {
    id: 'spaceflight_risk_comment',
    ariaLabel: tForm('type.spaceflight_risk_comment'),
    name: tForm('type.spaceflight_risk_comment'),
    defaultValue: event.spaceflight_risk_comment || '',
    type: 'text',
  }, {
    id: 'uk_response_comment',
    ariaLabel: tForm('type.immediate_response'),
    name: tForm('type.immediate_response'),
    defaultValue: event.uk_response_comment || '',
    type: 'text',
  }, {
    id: 'press_attention_comment',
    ariaLabel: tForm('type.press_attention_addition'),
    name: tForm('type.press_attention_addition'),
    defaultValue: event.press_attention_comment || '',
    type: 'text',
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { FragmentationAlertEditForm };
