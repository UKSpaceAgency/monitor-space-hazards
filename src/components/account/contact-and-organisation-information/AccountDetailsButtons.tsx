'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { patchUsersMe } from '@/actions/patchUsersMe';
import Button from '@/ui/button/button';

type AccountDetailsButtonsProps = {
  showReturnButton: boolean;
};

export function AccountDetailsButtons({ showReturnButton }: AccountDetailsButtonsProps) {
  const t = useTranslations('ContactAndOrganisationInformation');
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const saveAndContinue = async () => {
    setLoading(true);

    await patchUsersMe({
      account_details_confirmed_at: new Date().toJSON(),
    });

    router.back();
  };

  return (
    <>
      {showReturnButton
        ? (
            <Button element="button" onClick={() => router.back()}>
              {t('buttons.return')}
            </Button>
          )
        : (
            <Button element="button" disabled={isLoading} onClick={saveAndContinue}>
              {t('buttons.save_and_continue')}
            </Button>
          )}
    </>
  );
}
