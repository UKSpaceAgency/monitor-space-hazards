'use client';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';
import { getBackUrl } from '@/utils/Helpers';

import type { EventAlertType } from './EventAlertTypes';

type EventAlertSendSuccessProps = {
  type: EventAlertType;
  shortId: string;
};

const EventAlertSendSuccess = ({ type, shortId }: EventAlertSendSuccessProps) => {
  const t = useTranslations('Forms.Send_alert.Success');
  const pathname = usePathname();

  const eventPageUrl = getBackUrl(pathname, 2);

  return (
    <div>
      <Panel heading={t('title')}>{t('content', { type, shortId })}</Panel>
      <Button as="link" href={eventPageUrl} aria-label={t('return')}>{t('return')}</Button>
    </div>
  );
};

export { EventAlertSendSuccess };
