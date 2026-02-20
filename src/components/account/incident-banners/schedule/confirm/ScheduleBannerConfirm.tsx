'use client';

import { useMutation } from '@tanstack/react-query';
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
        <TopNotificationBanner status="success" heading={t('Success_banner.title', { title })} aria-label="Set up incident banner" id="success-incident-banner">
          <p className="govuk-body">
            {t('Success_banner.content', {
              from: dayjs(banner.broadcast_start).format(FORMAT_DATE_TIME),
              to: dayjs(banner.broadcast_end).format(FORMAT_DATE_TIME),
            })}
          </p>
          <ButtonGroup>
            <Button as="link" href="/conjunctions" className="govuk-button--secondary" aria-label={t('Success_banner.conjunction_events')}>
              {t('Success_banner.conjunction_events')}
            </Button>
            <Button as="link" href="/account/incident-banner" className="govuk-button--secondary" aria-label={t('Success_banner.manage_incident_banners')}>
              {t('Success_banner.manage_incident_banners')}
            </Button>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      {confirmModal && (
        <TopNotificationBanner status="error" heading={t('Confirm_banner.title', { title })} aria-label="Display confirmation banner" id="error-incident-banner">
          <p className="govuk-body">
            {t('Confirm_banner.content')}
          </p>
          <ButtonGroup>
            <Button variant="warning" onClick={() => mutate()} aria-label={t('Confirm_banner.yes')}>{t('Confirm_banner.yes')}</Button>
            <Button variant="secondary" onClick={() => setConfirmModal(false)} aria-label={t('Confirm_banner.no')}>{t('Confirm_banner.no')}</Button>
          </ButtonGroup>
        </TopNotificationBanner>
      )}
      <ButtonGroup>
        <Button onClick={() => setConfirmModal(true)} aria-label={t('display_button')}>
          {t('display_button')}
        </Button>
        <Button as="link" href="/account/incident-banners/schedule" variant="secondary" aria-label={tCommon('return', { to: 'incident banner options' })}>{tCommon('return', { to: 'incident banner options' })}</Button>
      </ButtonGroup>
    </>
  );
};

export { ScheduleBannerConfirm };
