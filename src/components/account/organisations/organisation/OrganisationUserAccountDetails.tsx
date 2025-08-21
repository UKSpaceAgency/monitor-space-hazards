'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

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

  const confirmDelete = useCallback(async () => {
    await deleteUser(user.id);

    replace(`/account/organisations/${user.organizationId}`);
  }, [replace, user.id, user.organizationId]);

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
              className="govuk-button--warning"
              onClick={confirmDelete}
              aria-label="Delete user confirmation button"
            >
              {t('yes_delete')}
            </Button>
            <Button
              className="govuk-button--secondary"
              onClick={() => setConfirmMessage(false)}
              aria-label="Delete user cancellation button"
            >
              {t('cancel')}
            </Button>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      <ButtonGroup>
        <Button
          className="govuk-button--warning"
          onClick={() => setConfirmMessage(true)}
        >
          {t('delete_user')}
        </Button>
        {(isAgencyUser(user.role) || isGovUser(user.role)) && (
          <Button as="link" href={`/account/alert-settings/${user.id}`}>
            {t('edit_alert_settings')}
          </Button>
        )}
        <Button
          as="link"
          href={`/account/organisations/${user.organizationId}`}
          className="govuk-button--secondary"
        >
          {t('return', { to: 'user accounts' })}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export { OrganisationUserAccountDetails };
