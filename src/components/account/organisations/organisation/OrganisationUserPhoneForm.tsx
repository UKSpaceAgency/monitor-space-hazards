'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { patchUsersUserId } from '@/actions/patchUsersUserId';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Input from '@/ui/input/input';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import type { PhoneUserSchema } from '@/validations/phoneUserSchema';
import { phoneUserSchema } from '@/validations/phoneUserSchema';

type OrganisationUserPhoneFormProps = {
  user: TypeUserOut;
};

const OrganisationUserPhoneForm = ({ user }: OrganisationUserPhoneFormProps) => {
  const t = useTranslations('Forms.User_edit');
  const tCommon = useTranslations('Common');

  const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: { phone: '' },
    resolver: zodResolver(phoneUserSchema),
  });

  const onSubmit = async (data: PhoneUserSchema) => {
    await patchUsersUserId(user.id, { phone_number: data.phone });
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div>
        <NotificationBanner status="success">
          <h3 className="govuk-notification-banner__heading">
            {t('success')}
          </h3>
        </NotificationBanner>
        <Button
          as="link"
          href={`/account/organisations/${user.organizationId}/${user.id}`}
          className="govuk-button--secondary"
          aria-label={tCommon('return', { to: 'user account details' })}
        >
          {tCommon('return', { to: 'user account details' })}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('phone')} required id="phone" label={t('phone_label')} error={errors.phone?.message} aria-label="Phone" autoComplete="phone_number" />
      <ButtonGroup>
        <Button
          as="link"
          href={`/account/organisations/${user.organizationId}/${user.id}`}
          className="govuk-button--secondary"
          aria-label={t('back')}
        >
          {t('back')}
        </Button>
        <Button type="submit" aria-label={t('save')}>{t('save')}</Button>
      </ButtonGroup>
    </form>
  );
};

export { OrganisationUserPhoneForm };
