import type { RichTranslationValues } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { AppConfig } from '@/utils/AppConfig';

export const defaultTranslationValues: RichTranslationValues = {
  h3: chunks => <h3 className="govuk-heading-m">{chunks}</h3>,
  p: chunks => <p className="govuk-body">{chunks}</p>,
  list: chunks => <ul className="govuk-list govuk-list--bullet">{chunks}</ul>,
  item: chunks => <li>{chunks}</li>,
  bold: chunks => <b>{chunks}</b>,
  special: (chunks: ReactNode) => <strong className="govuk-tag">{chunks}</strong>,
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
