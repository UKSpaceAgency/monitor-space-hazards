'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';

type TermsAndConditionsFormProps = {
  onSubmit: () => Promise<void>;
  label: string;
};

const TermsAndConditionsForm = ({ label, onSubmit }: TermsAndConditionsFormProps) => {
  const tCommon = useTranslations('Common');
  const { update } = useSession();

  const [checked, setChecked] = useState(false);

  return (
    <form action={async () => {
      await onSubmit();
      update('setup');
    }}
    >
      <Checkboxes
        items={[
          {
            id: 'accept-terms',
            checked,
            children: label,
            onChange: () => setChecked(prevChecked => !prevChecked),
          },
        ]}
      />
      <Button type="submit" disabled={!checked}>
        {tCommon('save_and_continue')}
      </Button>
    </form>
  );
};

export { TermsAndConditionsForm };
