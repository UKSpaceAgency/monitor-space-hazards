'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

import type { EventAlertType } from './EventAlertTypes';

type EventAlertSendSuccessProps = {
  type: EventAlertType;
  shortId: string;
};

const EventAlertSendSuccess = ({ type, shortId }: EventAlertSendSuccessProps) => {
  const t = useTranslations('Forms.Send_alert.Success');
  const pathname = usePathname();

  const eventPageUrl = `${pathname.split('/').slice(0, -2).join('/')}`;

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { type, shortId })}</Panel>
      <Link href={eventPageUrl}>
        <Button>{t('return')}</Button>
      </Link>
    </div>
  );
};

export { EventAlertSendSuccess };
