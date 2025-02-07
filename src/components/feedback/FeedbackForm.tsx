'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { postFeedback } from '@/actions/postFeedback';
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

  const { register, handleSubmit, formState: { errors } } = useForm<FeedbackSchema>({
    defaultValues: feedBackFormDefaultValues,
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit: SubmitHandler<FeedbackSchema> = async (data) => {
    setLoading(true);

    await postFeedback(data);

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorSummary i18path="Feedback" errors={errors} />
      <Fieldset
        legend={{
          text: t('survey_label'),
        }}
      >
        <Radios
          id="satisfaction"
          label={t('radios_label')}
          labelClass="govuk-fieldset__legend--m"
          error={errors.satisfaction?.message}
          items={[{
            value: '5',
            children: t('very_satisfied'),
            ...register('satisfaction'),
          }, {
            value: '4',
            children: t('satisfied'),
            ...register('satisfaction'),
          }, {
            value: '3',
            children: t('neither'),
            ...register('satisfaction'),
          }, {
            value: '2',
            children: t('dissatisfied'),
            ...register('satisfaction'),
          }, {
            value: '1',
            children: t('very_dissatisfied'),
            ...register('satisfaction'),
          }]}
        />
      </Fieldset>
      <TextArea
        {...register('details')}
        id="details"
        label={t('textarea_label')}
        labelClass="govuk-fieldset__legend--m"
        hint={t('textarea_hint')}
        error={errors.details?.message}
      />
      <Button type="submit" disabled={loading}>{t('submit')}</Button>
    </form>
  );
};

export { FeedbackForm };
