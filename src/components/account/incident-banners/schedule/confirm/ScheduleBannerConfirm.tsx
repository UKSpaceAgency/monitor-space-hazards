'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import { postBannersSchedules } from '@/actions/postBannersSchedules';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

type ScheduleBannerConfirmProps = {
  title: string;
  banner: TypeBannerScheduleIn;
};

const ScheduleBannerConfirm = ({ title, banner }: ScheduleBannerConfirmProps) => {
  const t = useTranslations('Forms.Schedule_banner');
  const tCommon = useTranslations('Common');
  const [confirmModal, setConfirmModal] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['postSchedule'],
    mutationFn: async () => {
      await postBannersSchedules(banner);
    },
    onSuccess: () => {
      setConfirmModal(false);
    },
  });

  return (
    <>
      {isSuccess && (
        <TopNotificationBanner status="success" heading={t('Success_banner.title', { title })}>
          <p className="govuk-body">
            {t('Success_banner.content', {
              from: dayjs(banner.broadcastStart).format(FORMAT_DATE_TIME),
              to: dayjs(banner.broadcastEnd).format(FORMAT_DATE_TIME),
            })}
          </p>
          <ButtonGroup>
            <Link href="/conjunctions">
              <Button className="govuk-button--secondary">
                {t('Success_banner.conjunction_events')}
              </Button>
            </Link>
            <Link href="/account/incident-banner">
              <Button className="govuk-button--secondary">
                {t('Success_banner.manage_incident_banners')}
              </Button>
            </Link>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      {confirmModal && (
        <TopNotificationBanner status="error" heading={t('Confirm_banner.title', { title })}>
          <p className="govuk-body">
            {t('Confirm_banner.content')}
          </p>
          <ButtonGroup>
            <Button variant="warning" onClick={() => mutate()}>{t('Confirm_banner.yes')}</Button>
            <Button variant="secondary" onClick={() => setConfirmModal(false)}>{t('Confirm_banner.no')}</Button>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      <ButtonGroup>
        <Button onClick={() => setConfirmModal(true)}>
          {t('display_button')}
        </Button>
        <Link href="/account/incident-banners/schedule">
          <Button variant="secondary">{tCommon('return', { to: 'incident banner options' })}</Button>
        </Link>
      </ButtonGroup>
    </>
  );
};

export { ScheduleBannerConfirm };
