'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { UseFormRegister } from 'react-hook-form';

import type { TypeNotificationSettings } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Checkboxes from '@/ui/checkboxes/checkboxes';

function Option({ name, label, register }: { name: keyof TypeNotificationSettings; label: string; register: UseFormRegister<TypeNotificationSettings> }) {
  return (
    <Checkboxes
      name={name}
      legend={label}
      items={[
        {
          id: `${name}_email`,
          children: 'Email',
          value: 'EMAIL',
          ...register(name),
        },
        {
          id: `${name}_sms`,
          children: 'Text',
          value: 'SMS',
          ...register(name),
        },
      ]}
    />
  );
}

type NotificationSettingsFormContentProps = {
  isSubmitting: boolean;
  register: UseFormRegister<TypeNotificationSettings>;
};

const NotificationSettingsFormContent = ({ isSubmitting, register }: NotificationSettingsFormContentProps) => {
  const t = useTranslations('Forms.Notification_settings');
  const tCommon = useTranslations('Common');

  return (
    <div>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        register={register}
        name="on_event_created"
        label={t('on_event_created')}
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        register={register}
        name="on_event_updated"
        label={t('on_event_updated')}
      />
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Option
        register={register}
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
