'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { FieldPath, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { TypeOrganizationOut, TypeUserRole } from '@/__generated__/data-contracts';
import { postUsers } from '@/actions/postUsers';
import { FormErrorSummary } from '@/components/form/FormErrorSummary';
import RichText from '@/components/RichText';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { isAgencyUser, isGovUser } from '@/utils/Roles';
import type { AddNewUserSchema } from '@/validations/addNewUserSchema';

import { AddNewUserFormContent } from './AddNewUserFormContent';

type AddNewUserFormProps = {
  defaultValues: {
    organization_id: string;
  };
  organizations: TypeOrganizationOut[];
  role?: TypeUserRole | null;

};

const AddNewUserForm = ({ defaultValues, organizations, role }: AddNewUserFormProps) => {
  const t = useTranslations('Forms.Add_new_user');
  const [createdUser, setCreatedUser] = useState<{ user_id: string; organization_id: string; role: TypeUserRole } | null>(null);

  const { register, handleSubmit, setError, reset, formState: { isSubmitting, isSubmitSuccessful, errors } } = useForm<AddNewUserSchema>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<AddNewUserSchema> = async (data) => {
    const { data: success, errors } = await postUsers(data);
    if (success) {
      setCreatedUser({
        user_id: success.user_id,
        organization_id: data.organization_id,
        role: data.role,
      });
      reset();
    }
    if (errors) {
      for (const error of errors) {
        setError(error.path as FieldPath<AddNewUserSchema>, {
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorSummary i18path="Add_new_user" errors={errors} />
      {isSubmitSuccessful && createdUser && (
        <TopNotificationBanner status="success">
          <div>
            <RichText>
              {tags => t.rich('success_message', {
                ...tags,
                organisation: organizations.find(({ id }) => id === createdUser?.organization_id)?.name,
              }) }
            </RichText>
            {(isGovUser(createdUser.role) || isAgencyUser(createdUser.role)) && (
              <RichText>
                {tags => t.rich('success_message_only_admins', tags) }
              </RichText>
            ) }
            <ButtonGroup>
              {(isGovUser(createdUser.role) || isAgencyUser(createdUser.role))
              && (
                <Link
                  href={`/account/alert-settings/${createdUser?.user_id}`}
                >
                  <Button>
                    {t('success_message_edit_settings_button')}
                  </Button>
                </Link>
              )}
              <Link
                href={`/account/organisations/${createdUser?.organization_id}`}
              >
                <Button className="govuk-button--secondary">
                  {t('success_message_return_button')}
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </TopNotificationBanner>
      )}
      <AddNewUserFormContent organizations={organizations} role={role ?? 'AGENCY_SUPERUSER'} register={register} errors={errors} isSubmitting={isSubmitting} />
    </form>
  );
};

export { AddNewUserForm };
