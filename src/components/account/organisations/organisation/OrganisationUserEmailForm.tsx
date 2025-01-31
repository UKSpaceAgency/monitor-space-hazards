'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { patchUsersUserId } from '@/actions/patchUsersUserId';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Input from '@/ui/input/input';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import type { EmailUserSchema } from '@/validations/emailUserSchemat';
import { emailUserSchema } from '@/validations/emailUserSchemat';

type OrganisationUserEmailFormProps = {
  user: TypeUserOut;
};

const OrganisationUserEmailForm = ({ user }: OrganisationUserEmailFormProps) => {
  const [isEmailChanged, setEmailChanged] = useState(false);

  const t = useTranslations('Forms.User_email');
  const tCommon = useTranslations('Common');

  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(emailUserSchema),
  });

  const onSubmit = async (data: EmailUserSchema) => {
    await patchUsersUserId(user.id, { email: data.email });

    reset();
    setEmailChanged(true);
  };

  return (
    <>
      {isEmailChanged
        ? (
            <>
              <NotificationBanner status="success">
                <h3 className="govuk-notification-banner__heading">
                  {t('notification.success')}
                </h3>
              </NotificationBanner>
              <Link
                href={`/account/organisations/${user.organizationId}/${user.id}`}
              >
                <Button
                  className="govuk-button--secondary"
                >
                  {tCommon('return', { to: 'user account details' })}
                </Button>
              </Link>
            </>
          )
        : null}

      {!isEmailChanged && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('email')} id="email" label={t('label')} error={errors.email?.message} />
          <ButtonGroup>
            <Link
              href={`/account/organisations/${user.organizationId}/${user.id}`}
            >
              <Button
                className="govuk-button--secondary"
              >
                {t('back')}
              </Button>
            </Link>
            <Button type="submit">{t('save')}</Button>
          </ButtonGroup>
        </form>
      )}
    </>
  );
};

export { OrganisationUserEmailForm };
