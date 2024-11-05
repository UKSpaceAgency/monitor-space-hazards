// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json');

type Nullable<T> = T | null | undefined;

// eslint-disable-next-line
declare interface IntlMessages extends Messages {}
