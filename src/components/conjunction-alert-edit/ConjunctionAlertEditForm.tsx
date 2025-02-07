import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeUniqueEventOut } from '@/__generated__/data-contracts';

import type { EventAlertFormField } from '../event-alert-edit/EventAlertEditForm';
import { EventAlertEditForm } from '../event-alert-edit/EventAlertEditForm';

type ConjunctionAlertEditFormProps = {
  event: TypeUniqueEventOut;
};

const ConjunctionAlertEditForm = ({ event }: ConjunctionAlertEditFormProps) => {
  const t = useTranslations('Conjunction_alert');
  const tForm = useTranslations('Forms.Edit_alert');

  const formFields: EventAlertFormField[] = [{
    id: 'exec_summary_addition',
    name: tForm('type.exec_summary_addition'),
    defaultValue: event.execSummaryAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Executive_summary.content', {
          primaryObject: event.primaryObjectCommonName,
          secondaryObject: event.secondaryObjectCommonName,
          primaryObjectUrl: chunks => <Link href={`/satellites/${event.primaryObjectNoradId}`}>{chunks}</Link>,
          secondaryObjectUrl: chunks => <Link href={`/satellites/${event.secondaryObjectNoradId}`}>{chunks}</Link>,
        })}
      </div>
    ),
  }, {
    id: 'manoeuvre_addition',
    name: tForm('type.manoeuvre_addition'),
    defaultValue: event.manoeuvreAddition || '',
    type: 'radio',
    items: [
      {
        children: tForm('manoeuvrable.unknown'),
        value: tForm('manoeuvrable.unknown'),
      },
      {
        children: tForm('manoeuvrable.expected'),
        value: tForm('manoeuvrable.expected'),
      },
      {
        children: tForm('manoeuvrable.not_expected'),
        value: tForm('manoeuvrable.not_expected'),
      },
      {
        children: tForm('manoeuvrable.na'),
        value: tForm('manoeuvrable.na'),
      },
    ],
    hint: tForm('manoeuvrable.hint'),
  }, {
    id: 'immediate_impact_addition',
    name: tForm('type.immediate_impact'),
    defaultValue: event.immediateImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Potential_impact_of_event.immediate_impact.content')}
      </div>
    ),
  }, {
    id: 'short_term_impact_addition',
    name: tForm('type.short_term_impact'),
    defaultValue: event.shortTermImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Potential_impact_of_event.short_term_impact.content')}
      </div>
    ),
  }, {
    id: 'long_term_impact_addition',
    name: tForm('type.long_term_impact'),
    defaultValue: event.shortTermImpactAddition,
    type: 'text',
    help: (
      <div>
        <p>{tForm('hint')}</p>
        {t.rich('Potential_impact_of_event.long_term_impact.content')}
      </div>
    ),
  }, {
    id: 'uk_response_addition',
    name: tForm('type.uk_response_addition'),
    defaultValue: event.shortTermImpactAddition,
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
    defaultValue: event.shortTermImpactAddition,
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
