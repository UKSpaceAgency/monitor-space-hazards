'use client';

import { useRouter } from 'next/navigation';

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

  const handleCloseBanner = () => {
    replace(window.location.pathname);
  };

  return (
    <>
      {showBanner && (
        <NotificationBanner status="success">
          <div>
            <p className="govuk-body">{message}</p>
            <ButtonGroup>
              <Button onClick={handleCloseBanner}>
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
