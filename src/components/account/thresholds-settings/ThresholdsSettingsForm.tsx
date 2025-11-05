'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type FieldPath, type SubmitHandler, useForm } from 'react-hook-form';

import { patchThresholds } from '@/actions/patchThresholds';
import { FormErrorSummary } from '@/components/form/FormErrorSummary';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { type ThresholdsSettingsFormSchema, thresholdsSettingsFormSchema } from '@/validations/thresholdsSettingsFormSchema';

import { ThresholdsSettingsFormContent } from './ThresholdsSettingsFormContent';

type ThresholdsSettingsFormProps = {
  defaultValues?: ThresholdsSettingsFormSchema;
};

const ThresholdsSettingsForm = ({ defaultValues }: ThresholdsSettingsFormProps) => {
  const t = useTranslations('Forms.Thresholds_settings');

  const { register, handleSubmit, setError, formState: { isSubmitting, isSubmitSuccessful, errors } } = useForm<ThresholdsSettingsFormSchema>({
    defaultValues,
    resolver: zodResolver(thresholdsSettingsFormSchema),
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<ThresholdsSettingsFormSchema> = async (data) => {
    const { errors } = await patchThresholds(data);
    if (errors) {
      for (const error of errors) {
        setError(error.path as FieldPath<ThresholdsSettingsFormSchema>, {
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {isSubmitSuccessful && <TopNotificationBanner status="success">{t('success_message')}</TopNotificationBanner>}
      <FormErrorSummary
        errors={errors}
        fieldOrder={Object.keys(defaultValues ?? {}) as (keyof ThresholdsSettingsFormSchema)[]}
      />
      <ThresholdsSettingsFormContent isSubmitting={isSubmitting} register={register} errors={errors} />
    </form>
  );
};

export { ThresholdsSettingsForm };
