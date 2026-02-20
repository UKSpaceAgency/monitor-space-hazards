'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Checkbox from '@/ui/checkbox/checkbox';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import TextArea from '@/ui/text-area/text-area';
import { capitalized } from '@/utils/Helpers';

import type { EventAlertData, EventAlertType } from './EventAlertTypes';

type FormData = {
  isPriority: boolean;
  isStandard: boolean;
  isUkSatellitesOnly: boolean;
  additionalRecipients: string;
  haveAdditionalRecipients: boolean;
};

type EventAlertSendFormProps = {
  type: EventAlertType;
  defaultValues: EventAlertData;
};

const EventAlertSendForm = ({ type, defaultValues }: EventAlertSendFormProps) => {
  const t = useTranslations('Forms.Send_alert');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { handleSubmit, register, reset, watch } = useForm<FormData>({
    defaultValues: {
      isPriority: defaultValues.isPriority,
      isStandard: defaultValues.isStandard,
      isUkSatellitesOnly: defaultValues.isUkSatellitesOnly,
      additionalRecipients: defaultValues.additionalRecipients || '',
      haveAdditionalRecipients: !!defaultValues.additionalRecipients?.length,
    },
    reValidateMode: 'onSubmit',
  });

  const haveAdditionalRecipients = watch('haveAdditionalRecipients');

  const onSubmit = async (data: FormData) => {
    const searchParams = new URLSearchParams();
    if (type !== 'fragmentation') {
      searchParams.set('isPriority', data.isPriority.toString());
    }
    searchParams.set('isStandard', data.isStandard.toString());
    if (type === 're-entry') {
      searchParams.set('isUkSatellitesOnly', data.isUkSatellitesOnly.toString());
    }
    searchParams.set('additionalRecipients', data.haveAdditionalRecipients && data.additionalRecipients ? data.additionalRecipients.replaceAll(' ', '').split(/[,;]+/).toString() : '');
    router.push(`${pathname}/review?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      const defaultValues = Object.fromEntries(searchParams);
      reset({
        isStandard: defaultValues.isStandard === 'true',
        isPriority: defaultValues.isPriority === 'true',
        isUkSatellitesOnly: defaultValues.isUkSatellitesOnly === 'true',
        additionalRecipients: defaultValues.additionalRecipients,
        haveAdditionalRecipients: !!defaultValues.additionalRecipients?.length,
      });
    }
  }, [searchParams, reset]);

  const additionalRecipientsInput = haveAdditionalRecipients
    ? <TextArea className="mt-4" label={t('Change_distribution.individually_selected_recipients_label')} {...register('additionalRecipients')} />
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="govuk-heading-m">{t('Change_distribution.title')}</h3>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <p className="govuk-body">{t('Change_distribution.hint')}</p>
      <Checkbox {...register('isStandard')}>{t('Distribution_status.all_alerts', { type })}</Checkbox>
      {type !== 'fragmentation' && <Checkbox {...register('isPriority')}>{t('Distribution_status.priority_alert', { type })}</Checkbox>}
      {type === 're-entry' && (
        <Checkbox {...register('isUkSatellitesOnly')}>{t('Distribution_status.alert_for_uk', { type: capitalized(type) })}</Checkbox>
      )}
      <Checkboxes items={[{
        ...register('haveAdditionalRecipients'),
        children: t('Distribution_status.individually_selected_recipients', { type }),
        hint: t('Change_distribution.individually_selected_recipients_hint'),
        conditional: additionalRecipientsInput,
      }]}
      />
      <ButtonGroup>
        <Button type="submit" aria-label={t('review_button')}>{t('review_button')}</Button>
      </ButtonGroup>
    </form>

  );
};

export { EventAlertSendForm };
