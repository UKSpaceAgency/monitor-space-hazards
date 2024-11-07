'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';

type TermsAndConditionsFormProps = {
  onSubmit: VoidFunction;
  label: string;
};

const TermsAndConditionsForm = ({ label, onSubmit }: TermsAndConditionsFormProps) => {
  const tCommon = useTranslations('Common');

  const [checked, setChecked] = useState(false);

  return (
    <form action={onSubmit}>
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
      <Button type="submit" element="button" disabled={!checked}>
        {tCommon('save_and_continue')}
      </Button>
    </form>
  );
};

export { TermsAndConditionsForm };
