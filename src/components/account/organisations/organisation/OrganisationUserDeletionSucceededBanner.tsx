'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

type OrganisationUserDeletionSucceededBannerProps = {
  showBanner: boolean;
  message: string;
  buttonText: string;
};

const OrganisationUserDeletionSucceededBanner = ({ showBanner, message, buttonText }: OrganisationUserDeletionSucceededBannerProps) => {
  const { replace } = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseBanner = () => {
    replace(window.location.pathname);
  };

  useEffect(() => {
    if (showBanner) {
      closeButtonRef.current?.focus();
    }
  }, [showBanner]);

  return (
    <>
      {showBanner && (
        <NotificationBanner status="success">
          <div>
            <p className="govuk-body">{message}</p>
            <ButtonGroup>
              <Button onClick={handleCloseBanner} ref={closeButtonRef} aria-label={buttonText}>
                {buttonText}
              </Button>
            </ButtonGroup>
          </div>
        </NotificationBanner>
      )}
    </>
  );
};

export { OrganisationUserDeletionSucceededBanner };
