'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler, UseFormRegister } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import { patchAlertsUserUserId } from '@/actions/patchAlertsUserUserId';
import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import Fieldset from '@/ui/fieldset/fieldset';
import Panel from '@/ui/panel/panel';
import Radios from '@/ui/radios/radios';
import WarningText from '@/ui/warning-text/warning-text';
import type { AlertSettingsSchema } from '@/validations/alertSettingsSchema';

import { AlertSettingsDetails } from './AlertSettingsDetails';
import { RegionsTable } from './RegionsTableRow';

function Option({
  name,
  hint,
  label,
  register,
}: { name: keyof AlertSettingsSchema; hint: string; label: string; register: UseFormRegister<AlertSettingsSchema> }) {
  return (
    <Checkboxes
      name={name}
      hint={hint}
      items={[
        {
          id: 'email',
          children: 'Email',
          value: 'EMAIL',
          ...register(name),
        },
        {
          id: 'sms',
          children: 'SMS',
          value: 'SMS',
          ...register(name),
        },
      ]}
    >
      <p className="govuk-body"><b>{label}</b></p>
    </Checkboxes>
  );
}

type AlertSettingsFormProps = {
  userId: string;
  defaultValues: AlertSettingsSchema;
  selfEdit?: boolean;
};

const AlertSettingsForm = ({ userId, defaultValues, selfEdit = true }: AlertSettingsFormProps) => {
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
        chosen_option: data.conjunctionAlerts,
        notification_types: data.receiveConjunction,
      },
      reentry_alert_settings: {
        chosen_option: data.reEntryAlerts,
        notification_types: data.receiveReEntry,
        areas_of_interest: data.areasOfInterest,
      },
    };

    await patchAlertsUserUserId(userId, payload);

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
              <Link href="/account">
                <Button>
                  {tCommon('return', { to: 'account page' })}
                </Button>
              </Link>
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
                  <Fieldset legend={{
                    text: t('conjunction_alerts'),
                  }}
                  >
                    <Radios
                      id="conjunctionAlerts"
                      label={t(
                        `${selfEdit ? 'self_which' : 'their_which'}`,
                        { type: 'conjunction' },
                      )}
                      hint={t('select_one_option')}
                      items={[{
                        value: 'none',
                        children: t('no_conjunction_alerts'),
                        ...register('conjunctionAlerts'),
                      }, {
                        value: 'all',
                        children: t('receive_all_conjunction_alerts'),
                        hint: t('recommended_for'),
                        ...register('conjunctionAlerts'),
                      }, {
                        value: 'priority',
                        children: t('only_priority_conjunction_alerts'),
                        hint: t('recommended_for_all_other'),
                        ...register('conjunctionAlerts'),
                      }]}
                    />
                  </Fieldset>
                  <AlertSettingsDetails type="conjunction" />

                  <Option
                    name="receiveConjunction"
                    hint={t('select_one_option')}
                    label={t('how_would_you_like_conjunction')}
                    register={register}
                  />

                  <Fieldset legend={{
                    text: t('re_entry_alerts'),
                  }}
                  >
                    <Radios
                      id="reEntryAlerts"
                      label={t(
                        `${selfEdit ? 'self_which' : 'their_which'}`,
                        { type: 're-entry' },
                      )}
                      hint={t('select_one_option')}
                      items={[{
                        value: 'none',
                        children: t('no_re_entry_alerts'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'all',
                        children: t('all_re_entry_alerts', { whose: selfEdit ? 'your' : 'user\'s' }),
                        hint: t('recommended_for_uk'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'uk_satellites_only',
                        children: t('re_entry_alerts_for_uk'),
                        hint: t('recommended_for_foreign'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'priority',
                        children: t('only_priority_re_entry', { whose: selfEdit ? 'your' : 'user\'s' }),
                        hint: t('recommended_for_all_other'),
                        ...register('reEntryAlerts'),
                      }]}
                    />
                  </Fieldset>
                  <AlertSettingsDetails type="re-entry" />

                  <p className="govuk-body">
                    <b>
                      {t(
                        'select_the_areas_of_interest',
                        { whose: selfEdit ? 'your' : 'user\'s' },
                      )}
                    </b>
                  </p>

                  <RegionsTable name="areasOfInterest" />

                  <p className="govuk-body">
                    {t('notifications_for_re_entries')}
                  </p>

                  <Option
                    name="receiveReEntry"
                    hint={t('select_one_option')}
                    label={t('how_would_you_like_re_entry')}
                    register={register}
                  />

                  <div className="govuk-button-group">
                    <Button type="submit">
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
