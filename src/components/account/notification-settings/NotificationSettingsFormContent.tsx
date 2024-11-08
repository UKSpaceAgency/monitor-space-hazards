'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-hook-form';

import { FormCheckboxes } from '@/components/form/FormCheckboxes';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

function Option({ name, label }: { name: string; label: string }) {
  return (
    <FormCheckboxes
      name={name}
      legend={label}
      items={[
        {
          id: `${name}_email`,
          children: 'Email',
          value: 'EMAIL',
        },
        {
          id: `${name}_sms`,
          children: 'Text',
          value: 'SMS',
        },
      ]}
    />
  );
}

const NotificationSettingsFormContent = () => {
  const t = useTranslations('Forms.Notification_settings');
  const tCommon = useTranslations('Common');

  const { isSubmitting } = useFormState();

  return (
    <div>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        name="on_event_created"
        label={t('on_event_created')}
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        name="on_event_updated"
        label={t('on_event_updated')}
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        name="on_analysis_uploaded"
        label={t('on_analysis_uploaded')}
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <ButtonGroup>
        <Button type="submit" disabled={isSubmitting}>{tCommon('save_and_continue')}</Button>
        <Link href="/account">
          <Button variant="secondary">{tCommon('return', { to: 'Account' })}</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export { NotificationSettingsFormContent };
