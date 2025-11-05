'use client';

import { useTranslations } from 'next-intl';
import type { FieldPath, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { TypeNotificationSettings } from '@/__generated__/data-contracts';
import { patchNotificationSettings } from '@/actions/patchNotificationSettings';
import { FormErrorSummary } from '@/components/form/FormErrorSummary';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';

import { NotificationSettingsFormContent } from './NotificationSettingsFormContent';

type NotificationSettingsFormProps = {
  defaultValues: TypeNotificationSettings;
};

const NotificationSettingsForm = ({ defaultValues }: NotificationSettingsFormProps) => {
  const t = useTranslations('Forms.Notification_settings');

  const { register, handleSubmit, setError, formState: { isSubmitting, isSubmitSuccessful, errors } } = useForm<TypeNotificationSettings>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TypeNotificationSettings> = async (data: TypeNotificationSettings) => {
    const { errors } = await patchNotificationSettings(data);
    if (errors) {
      for (const error of errors) {
        setError(error.path as FieldPath<TypeNotificationSettings>, {
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      {isSubmitSuccessful && <TopNotificationBanner status="success">{t('success_message')}</TopNotificationBanner>}
      <FormErrorSummary
        errors={errors}
        fieldOrder={Object.keys(defaultValues) as (keyof TypeNotificationSettings)[]}
      />
      <NotificationSettingsFormContent isSubmitting={isSubmitting} register={register} />
    </form>
  );
};

export { NotificationSettingsForm };
