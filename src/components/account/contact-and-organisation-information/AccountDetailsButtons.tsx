'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { usePatchUsersMe } from '@/queries/usePatchUsersMe';
import Button from '@/ui/button/button';

type AccountDetailsButtonsProps = {
  showReturnButton: boolean;
};

export function AccountDetailsButtons({ showReturnButton }: AccountDetailsButtonsProps) {
  const t = useTranslations('ContactAndOrganisationInformation');
  const router = useRouter();

  const { mutateAsync: patchUsersMe, isPending } = usePatchUsersMe();

  const saveAndContinue = async () => {
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
            <Button element="button" disabled={isPending} onClick={saveAndContinue}>
              {t('buttons.save_and_continue')}
            </Button>
          )}
    </>
  );
}
