'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { patchUsersUserId } from '@/actions/patchUsersUserId';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Input from '@/ui/input/input';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import type { EmailUserSchema } from '@/validations/emailUserSchema';
import { emailUserSchema } from '@/validations/emailUserSchema';

type OrganisationUserEmailFormProps = {
  user: TypeUserOut;
};

const OrganisationUserEmailForm = ({ user }: OrganisationUserEmailFormProps) => {
  const t = useTranslations('Forms.User_edit');
  const tCommon = useTranslations('Common');

  const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(emailUserSchema),
  });

  const onSubmit = async (data: EmailUserSchema) => {
    await patchUsersUserId(user.id, { email: data.email });
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
        <Link
          href={`/account/organisations/${user.organizationId}/${user.id}`}
        >
          <Button
            className="govuk-button--secondary"
          >
            {tCommon('return', { to: 'user account details' })}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} id="email" label={t('email_label')} error={errors.email?.message} />
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
  );
};

export { OrganisationUserEmailForm };
