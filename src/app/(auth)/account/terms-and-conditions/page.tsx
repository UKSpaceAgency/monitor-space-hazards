import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'View Terms and Conditions',
};

export default async function TermsAndConditions() {
  const t = await getTranslations('TermsAndConditions');

  return (<div>{t('title')}</div>
  );
}
