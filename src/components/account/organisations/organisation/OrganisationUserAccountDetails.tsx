'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { deleteUser } from '@/actions/deleteUser';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { isAgencyUser, isGovUser } from '@/utils/Roles';

type OrganisationUserAccountDetailsProps = {
  user: TypeUserOut;
};

const OrganisationUserAccountDetails = ({ user }: OrganisationUserAccountDetailsProps) => {
  const t = useTranslations('Common');

  const [confirmMessage, setConfirmMessage] = useState(false);
  const { replace } = useRouter();
  const confirmDeleteButtonRef = useRef<HTMLButtonElement>(null);

  const confirmDelete = useCallback(async () => {
    await deleteUser(user.id);

    replace(`/account/organisations/${user.organizationId}`);
  }, [replace, user.id, user.organizationId]);

  useEffect(() => {
    if (confirmMessage) {
      confirmDeleteButtonRef.current?.focus();
    }
  }, [confirmMessage]);

  const onDeleteUser = () => {
    setConfirmMessage(true);
  };

  const onCancelDelete = () => {
    setConfirmMessage(false);
  };

  return (
    <div>
      {confirmMessage && (
        <TopNotificationBanner
          status="error"
          heading={t('are_you_sure_delete', { email: user.email })}
        >
          <p className="govuk-body">{t('if_you_delete')}</p>
          <ButtonGroup>
            <Button
              ref={confirmDeleteButtonRef}
              className="govuk-button--warning"
              onClick={confirmDelete}
              aria-label="Delete user confirmation"
            >
              {t('yes_delete')}
            </Button>
            <Button
              className="govuk-button--secondary"
              onClick={onCancelDelete}
              aria-label="Delete user cancellation"
            >
              {t('cancel')}
            </Button>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      <ButtonGroup>
        <Button
          className="govuk-button--warning"
          onClick={onDeleteUser}
          aria-label="Delete user"
        >
          {t('delete_user')}
        </Button>
        {(isAgencyUser(user.role) || isGovUser(user.role)) && (
          <Button as="link" href={`/account/alert-settings/${user.id}`} aria-label="Edit alert settings">
            {t('edit_alert_settings')}
          </Button>
        )}
        <Button
          as="link"
          href={`/account/organisations/${user.organizationId}`}
          className="govuk-button--secondary"
          aria-label="Return to user accounts"
        >
          {t('return', { to: 'user accounts' })}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export { OrganisationUserAccountDetails };
