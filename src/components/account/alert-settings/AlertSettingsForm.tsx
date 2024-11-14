'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import type { TypeAlertSettingsIn } from '@/__generated__/data-contracts';
import { patchAlertsUserUserId } from '@/actions/patchAlertsUserUserId';
import { FormErrorSummary } from '@/components/form/FormErrorSummary';
import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import Fieldset from '@/ui/fieldset/fieldset';
import Panel from '@/ui/panel/panel';
import Radios from '@/ui/radios/radios';
import WarningText from '@/ui/warning-text/warning-text';
import { Regions } from '@/utils/Regions';
import type { AlertSettingsSchema } from '@/validations/alertSettingsSchema';

import { AlertSettingsDetails } from './AlertSettingsDetails';
import { RegionsTableRow } from './RegionsTableRow';

type AlertSettingsFormProps = {
  userId: string;
  defaultValues: AlertSettingsSchema;
};

const AlertSettingsForm = ({ userId, defaultValues }: AlertSettingsFormProps) => {
  const t = useTranslations('Forms.Alert_settings');
  const tCommon = useTranslations('Common');

  const [isAlertUpdated, setAlertUpdated] = useState(false);

  const methods = useForm<AlertSettingsSchema>({
    defaultValues,
  });

  const { register, handleSubmit, formState: { errors } } = methods;

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
              <Link href="/account" passHref legacyBehavior>
                <Button>
                  {tCommon('return', { to: 'account page' })}
                </Button>
              </Link>
            </>
          )
        : (
            <>
              <h1 className="govuk-heading-xl">{t('title')}</h1>
              <p className="govuk-body">{t('description')}</p>
              <WarningText>
                {t('warning')}
              </WarningText>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormErrorSummary i18path="Alert_settings" errors={errors} />
                  <Fieldset legend={{
                    text: t('conjunction_alerts'),
                  }}
                  >
                    <Radios
                      id="conjunctionAlerts"
                      label={t('which_conjunction')}
                      hint={t('select_one_option')}
                      error={errors.conjunctionAlerts?.message as string}
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
                  <AlertSettingsDetails />

                  <Checkboxes
                    name="receiveConjunction"
                    hint={t('select_one_option')}
                    items={[
                      {
                        id: 'email',
                        children: 'Email',
                        value: 'EMAIL',
                        ...register('receiveConjunction'),
                      },
                      {
                        id: 'sms',
                        children: 'SMS',
                        value: 'SMS',
                        ...register('receiveConjunction'),
                      },
                    ]}
                  >
                    <p className="govuk-body"><b>{t('how_would_you_like_conjunction')}</b></p>
                  </Checkboxes>

                  <Fieldset legend={{
                    text: t('re_entry_alerts'),
                  }}
                  >
                    <Radios
                      id="reEntryAlerts"
                      label={t('which_re_entry')}
                      hint={t('select_one_option')}
                      error={errors.conjunctionAlerts?.message as string}
                      items={[{
                        value: 'none',
                        children: t('no_re_entry_alerts'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'all',
                        children: t('all_re_entry_alerts'),
                        hint: t('recommended_for_uk'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'uk_satellites_only',
                        children: t('re_entry_alerts_for_uk'),
                        hint: t('recommended_for_foreign'),
                        ...register('reEntryAlerts'),
                      }, {
                        value: 'priority',
                        children: t('only_priority_re_entry'),
                        hint: t('recommended_for_all_other'),
                        ...register('reEntryAlerts'),
                      }]}
                    />
                  </Fieldset>
                  <AlertSettingsDetails />

                  <p className="govuk-body">
                    <b>{t('select_the_user_areas_of_interest')}</b>
                  </p>
                  <table className="govuk-table">
                    <tbody className="govuk-table__body">
                      <RegionsTableRow region={Regions.ANYWHERE} name="areasOfInterest" toggleRegions />
                      <RegionsTableRow region={Regions.ENGLAND} name="areasOfInterest" intent />
                      <RegionsTableRow region={Regions.NORTHERN_IRELAND} name="areasOfInterest" intent />
                      <RegionsTableRow region={Regions.SCOTLAND} name="areasOfInterest" intent />
                      <RegionsTableRow region={Regions.WALES} name="areasOfInterest" intent />
                      <RegionsTableRow region={Regions.BRITISH_OVERSEAS_TERRITORIES} name="areasOfInterest" />
                      <RegionsTableRow region={Regions.SHANWICK} name="areasOfInterest" />
                      <RegionsTableRow region={Regions.NAVAREA} name="areasOfInterest" />
                      <RegionsTableRow region={Regions.REST_OF_THE_WORLD} name="areasOfInterest" />
                    </tbody>
                  </table>
                  <p className="govuk-body">
                    {t('notifications_for_re_entries')}
                  </p>

                  <Checkboxes
                    name="receiveReEntry"
                    hint={t('select_one_option')}
                    items={[
                      {
                        id: 'email',
                        children: 'Email',
                        value: 'EMAIL',
                        ...register('receiveReEntry'),
                      },
                      {
                        id: 'sms',
                        children: 'SMS',
                        value: 'SMS',
                        ...register('receiveReEntry'),
                      },
                    ]}
                  >
                    <p className="govuk-body"><b>{t('how_would_you_like_re_entry')}</b></p>
                  </Checkboxes>

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
