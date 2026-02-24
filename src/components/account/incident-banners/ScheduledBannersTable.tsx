'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import type { TypeBannerMessagesBroadcastedOut } from '@/__generated__/data-contracts';
import { deleteIncidentBanner } from '@/actions/deleteIncidentBanner';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

type ScheduledBannersTableProps = {
  banners: TypeBannerMessagesBroadcastedOut[];
};

const ScheduledBannersTable = ({ banners }: ScheduledBannersTableProps) => {
  const t = useTranslations('Tables.Incident_banners');
  const [bannerToRemove, setBannerToRemove] = useState<{ id?: string; title: string } | null>(null);
  const removeButtonRef = useRef<HTMLButtonElement>(null);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['removeBanner', bannerToRemove?.id],
    mutationFn: async () => {
      if (bannerToRemove?.id) {
        await deleteIncidentBanner(bannerToRemove.id);
      }
    },
  });

  useEffect(() => {
    if (bannerToRemove && !isSuccess) {
      removeButtonRef.current?.focus();
    }
  }, [bannerToRemove, isSuccess]);

  return (
    <>
      {bannerToRemove && (isSuccess
        ? (
            <TopNotificationBanner status="success" heading={t('Success_banner.title', { title: bannerToRemove.title })} aria-label={t('Success_banner.title', { title: bannerToRemove.title })}>
              <p className="govuk-body">{t('Success_banner.content')}</p>
              <ButtonGroup>
                <Button as="link" href="/conjunctions" className="govuk-button--secondary" aria-label={t('Success_banner.button')}>
                  {t('Success_banner.button')}
                </Button>
              </ButtonGroup>
            </TopNotificationBanner>
          )
        : (
            <TopNotificationBanner status="error" heading={t('Remove_confirmation.title', { title: bannerToRemove.title })} aria-label={t('Remove_confirmation.title', { title: bannerToRemove.title })}>
              <ButtonGroup>
                <Button ref={removeButtonRef} variant="warning" onClick={() => mutate()} aria-label={`Yes, delete ${bannerToRemove.title}`}>{t('Remove_confirmation.yes')}</Button>
                <Button variant="secondary" onClick={() => setBannerToRemove(null)} aria-label={`Cancel, deleting ${bannerToRemove.title}`}>{t('Remove_confirmation.no')}</Button>
              </ButtonGroup>
            </TopNotificationBanner>
          ))}
      {!banners.length
        ? <p className="govuk-body">{t('empty')}</p>
        : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHeader className="border-0">
                    {t('incident_type')}
                  </TableCellHeader>
                  <TableCellHeader className="border-0">
                    {t('time_period')}
                  </TableCellHeader>
                  <TableCellHeader className="border-0" />
                </TableRow>
              </TableHead>
              <TableBody>
                {banners.map(({ id, title, broadcast_start, broadcast_end }) => (
                  <TableRow key={id}>
                    <TableCell className="align-middle">{title}</TableCell>
                    <TableCell className="align-middle">
                      {`${dayjs(broadcast_start).format(FORMAT_DATE_TIME)} ${dayjs(broadcast_end).format(FORMAT_DATE_TIME)}`}
                    </TableCell>
                    <TableCell className="align-middle">
                      <Button variant="warning" className="m-0" onClick={() => setBannerToRemove({ title, id })} aria-label={t('remove')}>
                        {t('remove')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
    </>
  );
};

export { ScheduledBannersTable };
