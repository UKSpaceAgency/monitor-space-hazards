'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/ui/button/button';
import Checkboxes from '@/ui/checkboxes/checkboxes';

type TermsAndConditionsFormProps = {
  isTocAccepted: boolean;
  onSubmit: VoidFunction;
};

const TermsAndConditionsForm = ({ isTocAccepted, onSubmit }: TermsAndConditionsFormProps) => {
  const t = useTranslations('TermsAndConditions');
  const tCommon = useTranslations('Common');

  const [checked, setChecked] = useState(false);

  return (
    <form action={onSubmit}>
      <Checkboxes
        items={[
          {
            id: 'accept-terms',
            checked: checked || isTocAccepted,
            children: t('label'),
            value: 'true',
            disabled: isTocAccepted,
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
