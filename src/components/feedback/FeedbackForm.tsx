'use client';

import { useTranslations } from 'next-intl';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';

import { postFeedback } from '@/actions/postFeedback';
import Button from '@/ui/button/button';
import ErrorSummary from '@/ui/error-summary/error-summary';
import Fieldset, { } from '@/ui/fieldset/fieldset';
import Radios from '@/ui/radios/radios';
import TextArea from '@/ui/text-area/text-area';
import type { FeedbackSchema } from '@/validations/feedbackSchema';
import { feedBackFormDefaultValues } from '@/validations/feedbackSchema';

const FeedbackForm = () => {
  const t = useTranslations('Forms.Feedback');

  const { register } = useForm<FeedbackSchema>({
    defaultValues: feedBackFormDefaultValues,
  });

  const [state, formAction] = useFormState(postFeedback, null);
  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
    >
      {state?.errors && (
        <ErrorSummary
          errorList={state.errors.map(error => ({
            href: error.href,
            children: error.errorMessage,
          }))}
        />
      )}
      <Fieldset
        legend={{
          text: t('survey_label'),
        }}
      >
        <Radios
          id="satisfaction"
          label={t('radios_label')}
          labelClass="govuk-fieldset__legend--m"
          error={state?.errors.find(error => error.href === '#satisfaction')?.errorMessage}
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
        error={state?.errors.find(error => error.href === '#details')?.errorMessage}
      />
      <Button type="submit" disabled={pending}>{t('submit')}</Button>
    </form>
  );
};

export { FeedbackForm };
