import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeRisk } from '@/__generated__/data-contracts';
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
    id: 'closed_comment',
    ariaLabel: 'Closed comment',
    name: tForm('type.closed_comment'),
    defaultValue: event.closedComment ?? '',
    type: 'text',
    help: tForm.rich('closed_comment_hint'),
  }, {
    id: 'executive_summary_comment',
    ariaLabel: 'Exec summary',
    name: tForm('type.executive_summary_comment'),
    defaultValue: event.executiveSummaryComment,
    type: 'text',
    help: (
      <div>
        <p className="govuk-body">{tForm('hint')}</p>
        {tReentryAlert.rich('Executive_summary.content', {
          commonName: event?.objectName ?? 'Unknown',
          objectType: event?.objectType,
          date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
          riskLevel: event?.fragmentsRisk ?? 'Low',
          riskProbability: roundedPercentage(event?.fragmentsProbability ?? 0),
          fragmentsRisk: event?.fragmentsRisk,
          fragmentsProbability: roundedPercentage(event?.fragmentsProbability ?? 0),
          licensingCountry: getFullCountry(event.licenseCountry),
          tag: chunks => renderRiskTag(chunks as TypeRisk),
        })}
      </div>
    ),
  }, {
    id: 'immediate_response_comment',
    ariaLabel: 'Immediate response',
    name: tForm('type.immediate_impact_comment'),
    defaultValue: event.immediateResponseComment,
    type: 'text',
    help: (
      <div>
        <p className="govuk-body">{tForm('hint')}</p>
        {tReentryAlert.rich(`Guidance_on_response.risk.${event?.atmosphericRisk?.toLowerCase() as 'low' | 'medium' | 'high' ?? 'low'}`, { tag: chunks => renderRiskTag(chunks as TypeRisk) })}
      </div>
    ),
  }, {
    id: 'uk_response_comment',
    ariaLabel: tForm('type.uk_response_comment'),
    name: tForm('type.uk_response_comment'),
    defaultValue: event.ukResponseComment,
    type: 'text',
    help: (
      <div>
        <p className="govuk-body">{tForm('hint')}</p>
        {tReentryAlert.rich('Guidance_if_object_impacts_uk_interests.public_guidance_on_space_debris.content')}
      </div>
    ),
  },
  // {
  //   id: 'damages_liability_comment',
  //   ariaLabel: tForm('type.damages_liability_comment'),
  //   name: tForm('type.damages_liability_comment'),
  //   defaultValue: event.damagesLiabilityComment,
  //   type: 'text',
  //   help: (
  //     <div>
  //       <p className="govuk-body">{tForm('hint')}</p>
  //       {tReentryAlert.rich('Liability_for_damages.content', { licenseCountry: getFullCountry(event.licenseCountry) })}
  //     </div>
  //   ),
  // },
  {
    id: 'press_attention_comment',
    ariaLabel: tForm('type.press_attention_comment'),
    name: tForm('type.press_attention_comment'),
    defaultValue: event.pressAttentionComment,
    type: 'text',
    help: tForm.rich('press_attention_hint'),
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { ReentryAlertEditForm };
