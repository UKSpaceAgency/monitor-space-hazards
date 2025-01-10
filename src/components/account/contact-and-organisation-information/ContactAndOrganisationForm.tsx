'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';

type ContactAndOrganisationFormProps = {
  onSubmit: () => Promise<never>;
};

const ContactAndOrganisationForm = ({ onSubmit }: ContactAndOrganisationFormProps) => {
  const t = useTranslations('Common');
  const { update } = useSession();

  return (
    <form action={async () => {
      await onSubmit();
      update('setup');
    }}
    >
      <Button type="submit">{t('save_and_continue')}</Button>
    </form>
  );
};

export { ContactAndOrganisationForm };
