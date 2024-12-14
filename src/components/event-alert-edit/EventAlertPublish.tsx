'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Spinner from '@/ui/spinner/spinner';

type EventAlertPublishProps = {
  shortId: string;
  action: (id: string, data: { [key: string]: string }) => Promise<void>;
};

const EventAlertPublish = ({ shortId, action }: EventAlertPublishProps) => {
  const t = useTranslations('Forms.Edit_alert');
  const tCommon = useTranslations('Common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const prevPageUrl = `${pathname.split('/').slice(0, -2).join('/')}?${searchParams.toString()}`;

  const handleSubmit = async () => {
    const data = Object.fromEntries(searchParams);
    setLoading(true);
    action(shortId, data);
  };

  if (loading) {
    return <Spinner />;
  }

  if (confirm) {
    return (
      <NotificationBanner heading={t('publish_confirm')}>
        <ButtonGroup>
          <Button onClick={handleSubmit}>
            {tCommon('yes')}
          </Button>
          <Button variant="secondary" onClick={() => setConfirm(false)}>
            {tCommon('no')}
          </Button>
        </ButtonGroup>
      </NotificationBanner>
    );
  }

  return (
    <ButtonGroup>
      <Button onClick={() => setConfirm(true)}>
        {t('publish_edits')}
      </Button>
      <Link href={prevPageUrl}>
        <Button variant="secondary">{t('publish_return')}</Button>
      </Link>
    </ButtonGroup>
  );
};

export { EventAlertPublish };
