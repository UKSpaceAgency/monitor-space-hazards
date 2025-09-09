'use client';
import type { Session } from 'next-auth';
import { useEffect, useRef } from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { isAdmin } from '@/utils/Roles';

type SetupNotificationBannerProps = {
  session: Session | null;
  viewAccountSettingsText: string;
  viewHomeText: string;
  addUsersText: string;
  notificationsLabel: string;
};

const SetupNotificationBanner = ({ session, viewAccountSettingsText, viewHomeText, addUsersText, notificationsLabel }: SetupNotificationBannerProps) => {
  const accountSettingButtonRef = useRef<HTMLAnchorElement>(null);
  const isCompleted = session?.user.setup_completed;

  useEffect(() => {
    if (isCompleted) {
      accountSettingButtonRef.current?.focus();
    }
  }, [isCompleted]);

  return (
    <NotificationBanner status={isCompleted ? 'success' : 'important'}>
      <p className="govuk-notification-banner__heading">
        {notificationsLabel}
      </p>
      {isCompleted && (
        <ButtonGroup>
          <Button ref={accountSettingButtonRef} as="link" href="/account" aria-label={viewAccountSettingsText}>
            {viewAccountSettingsText}
          </Button>
          {!isAdmin(session.user.role) && (
            <Button as="link" href="/" className="govuk-button--secondary" aria-label={viewHomeText}>
              {viewHomeText}
            </Button>
          )}
          {isAdmin(session.user.role) && (
            <Button as="link" href="/account/add-new-user" className="govuk-button--secondary" aria-label={addUsersText}>
              {addUsersText}
            </Button>
          )}
        </ButtonGroup>
      )}
    </NotificationBanner>
  );
};

export { SetupNotificationBanner };
