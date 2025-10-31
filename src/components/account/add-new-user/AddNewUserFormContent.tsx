'use client';

import { pick } from 'lodash';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { TypeOrganizationOut, TypeUserRole } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Details from '@/ui/details/details';
import Fieldset from '@/ui/fieldset/fieldset';
import Input from '@/ui/input/input';
import Radios from '@/ui/radios/radios';
import Select from '@/ui/select/select';
import { AccountType } from '@/utils/Roles';
import type { AddNewUserSchema } from '@/validations/addNewUserSchema';

const roles = {
  AGENCY_SUPERUSER: AccountType,
  AGENCY_APPROVER: AccountType,
  AGENCY_ADMIN: pick<Record<TypeUserRole, string>, TypeUserRole>(AccountType, [
    'AGENCY_ADMIN',
    'AGENCY_USER',
  ]),
  AGENCY_ANALYST: pick<Record<TypeUserRole, string>, TypeUserRole>(AccountType, [
    'AGENCY_ADMIN',
    'AGENCY_ANALYST',
    'AGENCY_USER',
  ]),
  GOVERNMENT_ADMIN: pick<Record<TypeUserRole, string>, TypeUserRole>(AccountType, [
    'GOVERNMENT_ADMIN',
    'GOVERNMENT_USER',
  ]),
  SATELLITE_OPERATOR_ADMIN: pick<Record<TypeUserRole, string>, TypeUserRole>(AccountType, [
    'SATELLITE_OPERATOR_ADMIN',
    'SATELLITE_OPERATOR',
    'SATELLITE_OPERATOR_USER',
  ]),
};

type AddNewUserFormContentProps = {
  organizations: TypeOrganizationOut[];
  role: TypeUserRole;
  isSubmitting: boolean;
  register: UseFormRegister<AddNewUserSchema>;
  errors: FieldErrors<AddNewUserSchema>;
};

const AddNewUserFormContent = ({ organizations, isSubmitting, register, role, errors }: AddNewUserFormContentProps) => {
  const t = useTranslations('Forms.Add_new_user');

  return (
    <div>
      <Select
        label={t('organization_id')}
        {...register('organization_id')}
        error={errors.organization_id?.message}
        options={organizations.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
      />
      <Input {...register('first_name')} required id="first_name" label={t('first_name')} error={errors.first_name?.message} aria-label="First Name" autoComplete="first_name" />
      <Input {...register('last_name')} required id="last_name" label={t('last_name')} error={errors.last_name?.message} aria-label="Last Name" autoComplete="last_name" />
      <Input {...register('email')} required id="email" label={t('email')} type="email" error={errors.email?.message} aria-label="Email" autoComplete="email" />
      <Input {...register('phone_number')} id="phone_number" label={`${t('phone_number')} (optional)`} type="tel" error={errors.phone_number?.message} aria-label="Phone Number (optional)" autoComplete="phone_number" />
      <Fieldset legend={{
        text: t('select_account_type'),
      }}
      >
        {role in roles && (
          <Radios
            id="role"
            required
            aria-label="Role"
            hint={t('select_account_type_hint')}
            error={errors.role?.message}
            items={Object.keys(roles[role as keyof typeof roles]).map(key => ({
              id: `role-${key}`,
              value: key,
              children: AccountType[key as keyof typeof AccountType],
              ...register('role'),
            }))}
          />
        )}
      </Fieldset>

      <Details summary={t('help.title')}>
        <p>
          <b className="mr-1">{t('help.admins')}</b>
          {t('help.adminsDescription')}
        </p>
        <p>
          <b className="mr-1">{t('help.operators')}</b>
          {t('help.operatorsDescription')}
        </p>
        <p>
          <b className="mr-1">{t('help.users')}</b>
          {t('help.usersDescription')}
        </p>
      </Details>

      <ButtonGroup>
        <Button type="submit" disabled={isSubmitting} aria-label={t('submit')}>{t('submit')}</Button>
      </ButtonGroup>
    </div>
  );
};

export { AddNewUserFormContent };
