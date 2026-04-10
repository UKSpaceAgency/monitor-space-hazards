'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler, UseFormRegister } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';
import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import Panel from '@/ui/panel/panel';
import WarningText from '@/ui/warning-text/warning-text';
import type { AlertSettingsSchema } from '@/validations/alertSettingsSchema';

import { AlertSettingsDetails } from './AlertSettingsDetails';
import { RegionsTable } from './RegionsTable';

function Option({
  id,
  name,
  hint,
  label,
  register,
}: { id: string; name: keyof AlertSettingsSchema; hint: string; label: string; register: UseFormRegister<AlertSettingsSchema> }) {
  return (
    <Checkboxes
      name={name}
      hint={hint}
      id={id}
      items={[
        {
          id: `email-${id}`,
          children: 'Email',
          value: 'EMAIL',
          ...register(name),
        },
        {
          id: `sms-${id}`,
          children: 'SMS',
          value: 'SMS',
          ...register(name),
        },
      ]}
    >
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--s mb-5"><b>{label}</b></legend>
    </Checkboxes>
  );
}

type AlertSettingsFormProps = {
  defaultValues: AlertSettingsSchema;
  selfEdit?: boolean;
  onSubmit: (data: TypeAlertSettingsIn) => Promise<void>;
};

const AlertSettingsForm = ({ defaultValues, selfEdit = true, onSubmit: onSubmitAction }: AlertSettingsFormProps) => {
  const t = useTranslations('Forms.Alert_settings');
  const tCommon = useTranslations('Common');

  const [isAlertUpdated, setAlertUpdated] = useState(false);

  const methods = useForm<AlertSettingsSchema>({
    defaultValues,
  });

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<AlertSettingsSchema> = async (data) => {
    const payload: TypeAlertSettingsIn = {
      conjunction_alert_settings: {
        chosen_options: data.conjunctionAlerts,
        notification_types: data.receiveConjunction,
      },
      reentry_alert_settings: {
        chosen_options: data.reEntryAlerts,
        notification_types: data.receiveReEntry,
        areas_of_interest: data.areasOfInterest,
      },
      fragmentation_alert_settings: {
        chosen_options: data.fragmentationAlerts,
        notification_types: data.receiveFragmentation,
      },
    };

    await onSubmitAction(payload);

    setAlertUpdated(true);
  };

  return (
    <>
      {isAlertUpdated
        ? (
            <>
              <Panel
                heading={t('panel.title')}
              >
                {t('panel.description')}
              </Panel>
              <Button as="link" href="/account" aria-label={tCommon('return', { to: 'account page' })}>
                {tCommon('return', { to: 'account page' })}
              </Button>
            </>
          )
        : (
            <>
              <h1 className="govuk-heading-xl">{t('title', { whose: selfEdit ? 'your' : 'user\'s' })}</h1>
              <p className="govuk-body">{t('description')}</p>
              {selfEdit && (
                <WarningText>
                  {t('warning')}
                </WarningText>
              )}
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Accordion
                    id="alert-settings"
                    initialItems={[
                      {
                        id: 're_entry_alerts',
                        heading: t('re_entry_alerts'),
                        content: (
                          <>
                            <Checkboxes
                              id="reEntryAlerts"
                              aria-label="Re-entry Alerts"
                              legend={t(
                                `${selfEdit ? 'self_which' : 'their_which'}`,
                                { type: 're-entry' },
                              )}
                              hint={t('select_one_option')}
                              items={[{
                                id: 'all_re_entry_alerts',
                                value: 'standard',
                                children: t('all_re_entry_alerts', { whose: selfEdit ? 'your' : 'user\'s' }),
                                hint: t('recommended_for_uk'),
                                ...register('reEntryAlerts'),
                              }, {
                                id: 'only_priority_re_entry',
                                value: 'priority',
                                children: t('only_priority_re_entry', { whose: selfEdit ? 'your' : 'user\'s' }),
                                hint: t('recommended_for_all_other'),
                                ...register('reEntryAlerts'),
                              }, {
                                id: 're_entry_alerts_for_uk',
                                value: 'uk-licensed',
                                children: t('re_entry_alerts_for_uk'),
                                hint: t('recommended_for_foreign'),
                                ...register('reEntryAlerts'),
                              }]}
                            />
                            <AlertSettingsDetails type="re-entry" />

                            <RegionsTable
                              name="areasOfInterest"
                              legend={t(
                                'select_the_areas_of_interest',
                                { whose: selfEdit ? 'your' : 'user\'s' },
                              )}
                            />

                            <p className="govuk-body">
                              {t('notifications_for_re_entries')}
                            </p>

                            <Option
                              id="receiveReEntry"
                              name="receiveReEntry"
                              hint={t('select_one_option')}
                              label={t('how_would_you_like_re_entry')}
                              register={register}
                            />
                          </>
                        ),
                      },
                      {
                        id: 'fragmentation_alerts',
                        heading: t('fragmentation_alerts'),
                        content: (
                          <>
                            <Checkboxes
                              id="fragmentationAlerts"
                              aria-label="Fragmentation Alerts"
                              legend={t(
                                `${selfEdit ? 'self_which' : 'their_which'}`,
                                { type: 'fragmentation' },
                              )}
                              hint={t('select_one_option')}
                              items={[{
                                id: 'receive_all_fragmentation_alerts',
                                value: 'standard',
                                children: t('receive_all_fragmentation_alerts'),
                                hint: t('recommended_for_all_users'),
                                ...register('fragmentationAlerts'),
                              }, {
                                id: 'only_priority_fragmentation',
                                value: 'priority',
                                children: t('only_priority_fragmentation'),
                                hint: t('recommended_for_all_other'),
                                ...register('fragmentationAlerts'),
                              }]}
                            />
                            <AlertSettingsDetails type="fragmentation" />
                            <Option
                              id="receiveFragmentation"
                              name="receiveFragmentation"
                              hint={t('select_one_option')}
                              label={t('how_would_you_like_fragmentation')}
                              register={register}
                            />
                          </>
                        ),
                      },
                      {
                        id: 'conjunction_alerts',
                        heading: t('conjunction_alerts'),
                        content: (
                          <>
                            <Checkboxes
                              aria-label="Conjunction Alerts"
                              legend={t(
                                `${selfEdit ? 'self_which' : 'their_which'}`,
                                { type: 'conjunction' },
                              )}
                              hint={t('select_one_option')}
                              items={[{
                                id: 'receive_all_conjunction_alerts',
                                value: 'standard',
                                children: t('receive_all_conjunction_alerts'),
                                hint: t('recommended_for'),
                                ...register('conjunctionAlerts'),
                              }, {
                                id: 'only_priority_conjunction_alerts',
                                value: 'priority',
                                children: t('only_priority_conjunction_alerts'),
                                hint: t('recommended_for_all_other'),
                                ...register('conjunctionAlerts'),
                              }]}
                            />
                            <AlertSettingsDetails type="conjunction" />
                            <Option
                              id="receiveConjunction"
                              name="receiveConjunction"
                              hint={t('select_one_option')}
                              label={t('how_would_you_like_conjunction')}
                              register={register}
                            />
                          </>
                        ),
                      },
                    ]}
                  />
                  <div className="govuk-button-group">
                    <Button type="submit" aria-label={tCommon('save_and_continue')}>
                      {tCommon('save_and_continue')}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </>
          )}
    </>
  );
};

export { AlertSettingsForm };
