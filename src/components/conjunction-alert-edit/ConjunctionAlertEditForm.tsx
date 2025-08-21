import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut, TypeReentryRisk, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Risk';

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
    name: tForm('type.closed_comment'),
    defaultValue: event.closedComment ?? '',
    type: 'text',
    help: tForm.rich('closed_comment_hint'),
  }, {
    id: 'exec_summary_addition',
    name: tForm('type.exec_summary_addition'),
    defaultValue: event.execSummaryAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Executive_summary.content', {
          primaryObject: report.primaryObjectCommonName || 'Unknown',
          secondaryObject: report.secondaryObjectCommonName || 'Unknown',
          primaryObjectUrl: chunks => <Link href={`/satellites/${report.primaryObjectNoradId}`}>{chunks}</Link>,
          secondaryObjectUrl: chunks => <Link href={`/satellites/${report.secondaryObjectNoradId}`}>{chunks}</Link>,
          risk: report.risk,
          collisionProbability: roundedPercent(report.collisionProbability),
          tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
        })}
      </div>
    ),
  }, {
    id: 'manoeuvre_addition',
    name: tForm('type.manoeuvre_addition'),
    defaultValue: event.manoeuvreAddition || '',
    type: 'text',
    help: (
      <div>
        <p>{tForm('manoeuvrable.hint')}</p>
        {/* {t.rich('Operator_view.content', {
          link: chunks => <Link className="govuk-link" href={`/conjunctions/${event.shortId}`}>{chunks}</Link>,
        })} */}
      </div>
    ),
  }, {
    id: 'immediate_impact_addition',
    name: tForm('type.immediate_impact'),
    defaultValue: event.immediateImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.immediateImpactAddition ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'short_term_impact_addition',
    name: tForm('type.short_term_impact'),
    defaultValue: event.shortTermImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.shortTermImpactAddition ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'long_term_impact_addition',
    name: tForm('type.long_term_impact'),
    defaultValue: event.longTermImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint_replace')}</p>
        <p>{event.longTermImpactAddition ?? tForm('hint_empty')}</p>
      </div>
    ),
  }, {
    id: 'uk_response_addition',
    name: tForm('type.uk_response_addition'),
    defaultValue: event.ukResponseAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Guidance_on_response.uk_response.content')}
      </div>
    ),
  }, {
    id: 'press_attention_addition',
    name: tForm('type.press_attention_addition'),
    defaultValue: event.pressAttentionAddition,
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
