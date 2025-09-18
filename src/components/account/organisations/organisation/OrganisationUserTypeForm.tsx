'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { patchUsersUserId } from '@/actions/patchUsersUserId';
import RichText from '@/components/RichText';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Details from '@/ui/details/details';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Radios from '@/ui/radios/radios';
import { AccountType } from '@/utils/Roles';
import type { RoleUserSchema } from '@/validations/roleUserSchema';
import { roleUserSchema } from '@/validations/roleUserSchema';

type OrganisationUserTypeFormProps = {
  user: TypeUserOut;
};

const OrganisationUserTypeForm = ({ user }: OrganisationUserTypeFormProps) => {
  const t = useTranslations('Forms.User_edit');
  const tCommon = useTranslations('Common');

  const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: { role: user.role ?? 'AGENCY_USER' },
    resolver: zodResolver(roleUserSchema),
  });

  const onSubmit = async (data: RoleUserSchema) => {
    await patchUsersUserId(user.id, { role: data.role });
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div>
        <NotificationBanner status="success">
          <p className="govuk-notification-banner__heading">
            {t('success')}
          </p>
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
      <Radios
        id="role"
        aria-label="Role"
        required
        hint={t('role_hint')}
        error={errors.role?.message}
        items={Object.entries(AccountType).map(([key, value]) => ({
          id: 'role',
          value: key,
          children: value,
          ...register('role'),
        }))}
      />
      <Details summary={t('role_help.title')}>
        <RichText>
          {tags => t.rich('role_help.content', tags)}
        </RichText>
      </Details>
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

export { OrganisationUserTypeForm };
