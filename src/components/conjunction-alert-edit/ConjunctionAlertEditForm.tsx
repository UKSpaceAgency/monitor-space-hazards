import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Tags';

import type { EventAlertFormField } from '../event-alert-edit/EventAlertEditForm';
import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type ConjunctionAlertEditFormProps = {
  event: TypeUniqueEventOut;
  report: TypeConjunctionReportOut;
};

const ConjunctionAlertEditForm = ({ event, report }: ConjunctionAlertEditFormProps) => {
  const t = useTranslations('Conjunction_alert');
  const tForm = useTranslations('Forms.Edit_alert');

  const formFields: EventAlertFormField[] = [{
    id: 'closed_comment',
    ariaLabel: 'Closed comment',
    name: tForm('type.closed_comment'),
    defaultValue: event.closed_comment ?? '',
    type: 'text',
    help: tForm.rich('closed_comment_hint'),
  }, {
    id: 'executive_summary_comment',
    ariaLabel: 'Exec summary',
    name: tForm('type.executive_summary_comment'),
    defaultValue: event.executive_summary_comment,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Executive_summary.content', {
          primaryObject: report.primary_object_common_name || 'Unknown',
          secondaryObject: report.secondary_object_common_name || 'Unknown',
          primaryObjectUrl: chunks => <Link href={`/satellites/${report.primary_object_norad_id}`}>{chunks}</Link>,
          secondaryObjectUrl: chunks => <Link href={`/satellites/${report.secondary_object_norad_id}`}>{chunks}</Link>,
          risk: report.risk,
          collisionProbability: roundedPercent(report.collision_probability),
          tag: chunks => renderRiskTag(chunks as TypeRisk),
        })}
      </div>
    ),
  }, {
    id: 'manoeuvre_comment',
    ariaLabel: 'Manoeuvre addition',
    name: tForm('type.manoeuvre_comment'),
    defaultValue: event.manoeuvre_comment || '',
    type: 'text',
    help: (
      <div>
        <p>{tForm('manoeuvrable.hint')}</p>
        {/* {t.rich('Operator_view.content', {
          link: chunks => <Link className="govuk-link" href={`/conjunctions/${event.short_id}`}>{chunks}</Link>,
        })} */}
      </div>
    ),
  }, {
    id: 'immediate_impact_comment',
    ariaLabel: 'Immediate impact addition',
    name: tForm('type.immediate_impact'),
    defaultValue: event.immediate_impact_comment,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.immediate_impact_comment ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'short_term_impact_comment',
    ariaLabel: 'Short term impact addition',
    name: tForm('type.short_term_impact'),
    defaultValue: event.short_term_impact_comment,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.short_term_impact_comment ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'long_term_impact_comment',
    ariaLabel: 'Long term impact addition',
    name: tForm('type.long_term_impact'),
    defaultValue: event.long_term_impact_comment,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.long_term_impact_comment ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'uk_response_comment',
    ariaLabel: 'UK response addition',
    name: tForm('type.uk_response_comment'),
    defaultValue: event.uk_response_comment,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Guidance_on_response.uk_response.content')}
      </div>
    ),
  }, {
    id: 'press_attention_comment',
    ariaLabel: 'Press attention addition',
    name: tForm('type.press_attention_comment'),
    defaultValue: event.press_attention_comment,
    type: 'text',
    help: (
      <div>
        {tForm.rich('press_attention_hint')}
      </div>
    ),
  }];

  return (
    <EventAlertEditForm fields={formFields} />
  );
};

export { ConjunctionAlertEditForm };
