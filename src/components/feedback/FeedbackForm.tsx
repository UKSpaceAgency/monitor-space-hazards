'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { postFeedback } from '@/actions/postFeedback';
import { FormErrorSummary } from '@/components/form/FormErrorSummary';
import Button from '@/ui/button/button';
import Fieldset, { } from '@/ui/fieldset/fieldset';
import Panel from '@/ui/panel/panel';
import Radios from '@/ui/radios/radios';
import TextArea from '@/ui/text-area/text-area';
import { feedBackFormDefaultValues, type FeedbackSchema, feedbackSchema } from '@/validations/feedbackSchema';

const FeedbackForm = () => {
  const t = useTranslations('Forms.Feedback');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FeedbackSchema>({
    defaultValues: feedBackFormDefaultValues,
    resolver: zodResolver(feedbackSchema),
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit: SubmitHandler<FeedbackSchema> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('Satisfaction', data.satisfaction!);
    formData.append('Details', data.details);

    try {
      await postFeedback(formData);

      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Unexpected error: ', error);
    }
  };

  return (
    <>
      {submitted
        ? <Panel heading={t('success')} />
        : (
            <>
              <h1 className="govuk-heading-xl">{t('title')}</h1>
              <FormProvider {...methods}>
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
              </FormProvider>
            </>
          )}
    </>
  );
};

export { FeedbackForm };
