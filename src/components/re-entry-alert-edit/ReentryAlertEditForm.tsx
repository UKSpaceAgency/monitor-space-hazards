import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import { getFullCountry } from '@/utils/Regions';

import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type ReentryAlertEditFormProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertEditForm = ({ event }: ReentryAlertEditFormProps) => {
  const tReentryAlert = useTranslations('Reentry_alert');
  const tForm = useTranslations('Forms.Edit_alert');

  const formFields = [{
    id: 'exec_summary',
    name: tForm('type.exec_summary'),
    defaultValue: event.execSummary,
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Executive_summary.content')}
      </div>
    ),
  }, {
    id: 'immediate_response',
    name: tForm('type.immediate_response'),
    defaultValue: event.immediateResponse,
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Guidance_on_response.immediate_response.content', { hydrazine: chunks => chunks, kerosene: chunks => chunks })}
      </div>
    ),
  }, {
    id: 'recovery_and_clean_up',
    name: tForm('type.recovery_and_clean_up'),
    defaultValue: event.recoveryAndCleanUp,
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Guidance_on_response.recovery_and_clean_up.content')}
      </div>
    ),
  }, {
    id: 'damages_liability',
    name: tForm('type.damages_liability'),
    defaultValue: event.damagesLiability,
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
    help: tForm.rich('press_attention_hint'),
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { ReentryAlertEditForm };
