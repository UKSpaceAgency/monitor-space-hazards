import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

export const metadata: Metadata = {
  title: 'Contact a UKSA orbital analyst',
};

export default async function ContactAnalystSend({ searchParams }: { searchParams: { callback: string } }) {
  const t = await getTranslations('Contact_analyst_send');
  const tCommon = await getTranslations('Common');

  const { callback } = searchParams;

  return (
    <>
      <Panel heading={t('title')}>{t('content')}</Panel>
      <Button as="link" href={callback} aria-label={tCommon('return', { to: 'Event' })}>{tCommon('return', { to: 'Event' })}</Button>
    </>
  );
}
