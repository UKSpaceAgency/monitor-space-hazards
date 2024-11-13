import { useTranslations } from 'next-intl';
import type { FieldErrors } from 'react-hook-form';

import ErrorSummary from '@/ui/error-summary/error-summary';

type FormErrorSummaryProps<T extends object> = {
  i18path: keyof IntlMessages['Forms'];
  errors: FieldErrors<T>;
};

const FormErrorSummary = <T extends object>({ errors, i18path }: FormErrorSummaryProps<T>) => {
  const t = useTranslations(`Forms.${i18path}`);

  const entries = Object.entries(errors);

  if (!entries.length) {
    return null;
  }

  return (
    <ErrorSummary
      errorList={entries.map(([key, value]) => ({
        href: key !== 'root' ? `#${key}` : undefined,
        children: t.has(key as any) ? `${t(key as any)}: ${value.message}` : value.message || '',
      }))}
    />
  );
};

export { FormErrorSummary };
