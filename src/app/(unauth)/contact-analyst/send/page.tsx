import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

export const metadata: Metadata = {
  title: 'Contact a UKSA orbital analyst',
};

export default async function ContactAnalystSend({ searchParams }: { searchParams: { callback: string } }) {
  const t = await getTranslations('Contact_analyst.Send');
  const tCommon = await getTranslations('Common');

  const { callback } = searchParams;

  return (
    <>
      <Panel heading={t('title')}>{t('content')}</Panel>
      <Link href={callback}>
        <Button>{tCommon('return', { to: 'Event' })}</Button>
      </Link>
    </>
  );
}
