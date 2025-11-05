'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { env } from '@/libs/Env';
import Button from '@/ui/button/button';
import Fieldset, { } from '@/ui/fieldset/fieldset';
import Radios from '@/ui/radios/radios';
import TextArea from '@/ui/text-area/text-area';
import type { FeedbackSchema } from '@/validations/feedbackSchema';
import { feedBackFormDefaultValues, feedbackSchema } from '@/validations/feedbackSchema';

import { FormErrorSummary } from '../form/FormErrorSummary';

const FeedbackForm = () => {
  const t = useTranslations('Forms.Feedback');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FeedbackSchema>({
    defaultValues: feedBackFormDefaultValues,
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit: SubmitHandler<FeedbackSchema> = async (data) => {
    setLoading(true);

    // Check if feedback URL is configured
    if (!env.NEXT_PUBLIC_FEEDBACK_URL) {
      setError('root', {
        message: 'Feedback submission is not configured. Please contact support.',
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(env.NEXT_PUBLIC_FEEDBACK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push('/feedback/success');
    } catch (error) {
      console.error('Feedback submission error:', error);
      setError('root', {
        message: error instanceof Error ? error.message : 'An error occurred while submitting the feedback',
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorSummary
        errors={errors}
        fieldOrder={Object.keys(feedBackFormDefaultValues) as (keyof FeedbackSchema)[]}
      />
      <Fieldset
        legend={{
          text: t('survey_label'),
        }}
      >
        <Radios
          id="satisfaction"
          aria-label="Satisfaction"
          legend={t('radios_label')}
          legendClass="govuk-fieldset__legend--m"
          error={errors.satisfaction?.message}
          required
          items={[{
            id: '5',
            value: '5',
            children: t('very_satisfied'),
            ...register('satisfaction'),
          }, {
            id: '4',
            value: '4',
            children: t('satisfied'),
            ...register('satisfaction'),
          }, {
            id: '3',
            value: '3',
            children: t('neither'),
            ...register('satisfaction'),
          }, {
            id: '2',
            value: '2',
            children: t('dissatisfied'),
            ...register('satisfaction'),
          }, {
            id: '1',
            value: '1',
            children: t('very_dissatisfied'),
            ...register('satisfaction'),
          }]}
        />
      </Fieldset>
      <TextArea
        {...register('details')}
        id="Details"
        label={t('textarea_label')}
        labelClass="govuk-fieldset__legend--m"
        hint={t('textarea_hint')}
        required
        aria-label="Details"
        error={errors.details?.message}
      />
      <input type="hidden" name="_gotcha" style={{ display: 'none !important' }} />
      <Button type="submit" disabled={loading} aria-label={t('submit')}>{t('submit')}</Button>
    </form>
  );
};

export { FeedbackForm };
