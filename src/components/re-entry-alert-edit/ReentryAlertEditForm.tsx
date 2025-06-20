import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Risk';

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
        {tReentryAlert.rich('Executive_summary.content', {
          commonName: event?.objectName ?? 'Unknown',
          objectType: event?.objectType,
          date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
          riskLevel: event?.monteCarloRisk ?? 'Low',
          riskProbability: roundedPercentage(event?.monteCarloProbability ?? 0),
          licensingCountry: getFullCountry(event.licenseCountry),
          tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
        })}
      </div>
    ),
  }, {
    id: 'immediate_response',
    name: tForm('type.immediate_response'),
    defaultValue: event.immediateResponse,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {tReentryAlert.rich('Guidance_on_response.immediate_response.content', { hydrazine: chunks => (
          <Link
            href="https://www.gov.uk/government/publications/hydrazine-properties-and-incident-management"
            className="govuk-link"
            target="_blank"
          >
            {chunks}
          </Link>
        ), kerosene: chunks => (
          <Link
            href="https://www.gov.uk/government/publications/kerosene-properties-incident-management-and-toxicology"
            className="govuk-link"
            target="_blank"
          >
            {chunks}
          </Link>
        ) })}
      </div>
    ),
  }, {
    id: 'recovery_and_clean_up',
    name: tForm('type.recovery_and_clean_up'),
    defaultValue: event.recoveryAndCleanUp,
    type: 'text',
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
