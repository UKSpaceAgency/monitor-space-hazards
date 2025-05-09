import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { getFullCountry } from '@/utils/Regions';

import type { EventAlertFormField } from '../event-alert-edit/EventAlertEditForm';
import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type ReentryAlertEditFormProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertEditForm = ({ event }: ReentryAlertEditFormProps) => {
  const tReentryAlert = useTranslations('Reentry_alert');
  const tForm = useTranslations('Forms.Edit_alert');

  const formFields: EventAlertFormField[] = [{
    id: 'exec_summary',
    name: tForm('type.exec_summary'),
    defaultValue: event.execSummary,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Executive_summary.content')}
      </div>
    ),
  }, {
    id: 'damages_liability',
    name: tForm('type.damages_liability'),
    defaultValue: event.damagesLiability,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Liability_for_damages.content', { licenseCountry: getFullCountry(event.licenseCountry) })}
      </div>
    ),
  }, {
    id: 'press_attention',
    name: tForm('type.press_attention'),
    defaultValue: event.pressAttention,
    type: 'text',
    help: tForm.rich('press_attention_hint'),
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { ReentryAlertEditForm };
