'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ReactNode, useCallback, useState } from 'react';

import type { TypeUserOut } from '@/__generated__/data-contracts';
import { deleteUser } from '@/actions/deleteUser';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type OrganisationUserAccountDetailsProps = {
  children: ReactNode;
  user: TypeUserOut;
};

const OrganisationUserAccountDetails = ({ children, user }: OrganisationUserAccountDetailsProps) => {
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
        <NotificationBanner
          status="error"
          heading={t('are_you_sure_delete', { email: user.email })}
        >
          <p className="govuk-body">{t('if_you_delete')}</p>
          <ButtonGroup>
            <Button
              className="govuk-button--warning"
              onClick={confirmDelete}
            >
              {t('yes_delete')}
            </Button>
            <Button
              className="govuk-button--secondary"
              onClick={() => setConfirmMessage(false)}
            >
              {t('cancel')}
            </Button>
          </ButtonGroup>
        </NotificationBanner>
      )}
      {children}
      <ButtonGroup>
        <Button
          className="govuk-button--warning"
          onClick={() => setConfirmMessage(true)}
        >
          {t('delete_user')}
        </Button>
        <Link
          href={`/account/organisations/${user.organizationId}`}
        >
          <Button
            className="govuk-button--secondary"
          >
            {t('return', { to: 'user accounts' })}
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export { OrganisationUserAccountDetails };
