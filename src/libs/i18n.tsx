import type { Formats, MessageKeys, NamespaceKeys, NestedKeyOf, NestedValueOf, RichTranslationValues, TranslationValues } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import type { ReactElement, ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

// Using internationalization in Server Components
// eslint-disable-next-line react-refresh/only-export-components
export default getRequestConfig(async () => {
  const locale = AppConfig.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    defaultTranslationValues: {
      p: (chunks: ReactNode) => <p className="govuk-body">{chunks}</p>,
    },
  };
});

export type TFunction<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never,
> = {
  <
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Partial<Formats>
  ): string;
  rich: <
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: RichTranslationValues,
    formats?: Partial<Formats>
  ) => string | ReactElement | ReactNode;
  raw: <
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey
  ) => any;
};
