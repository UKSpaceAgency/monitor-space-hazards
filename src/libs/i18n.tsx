import type { RichTranslationValues } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

export const defaultTranslationValues: RichTranslationValues = {
  p: (chunks: ReactNode) => <p className="govuk-body">{chunks}</p>,
  list: chunks => <ul className="govuk-list govuk-list--bullet">{chunks}</ul>,
  item: chunks => <li>{chunks}</li>,
  bold: chunks => <b>{chunks}</b>,
};

// Using internationalization in Server Components
// eslint-disable-next-line react-refresh/only-export-components
export default getRequestConfig(async () => {
  const locale = AppConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    defaultTranslationValues,
  };
});
