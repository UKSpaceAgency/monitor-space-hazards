'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['removeBanner', bannerToRemove?.id],
    mutationFn: async () => {
      if (bannerToRemove?.id) {
        await deleteIncidentBanner(bannerToRemove.id);
      }
    },
  });

  return (
    <>
      {bannerToRemove && (isSuccess
        ? (
            <TopNotificationBanner status="success" heading={t('Success_banner.title', { title: bannerToRemove.title })}>
              <p className="govuk-body">{t('Success_banner.content')}</p>
              <ButtonGroup>
                <Link href="/conjunctions">
                  <Button className="govuk-button--secondary">
                    {t('Success_banner.button')}
                  </Button>
                </Link>
              </ButtonGroup>
            </TopNotificationBanner>
          )
        : (
            <TopNotificationBanner status="error" heading={t('Remove_confirmation.title', { title: bannerToRemove.title })}>
              <ButtonGroup>
                <Button variant="warning" onClick={() => mutate()}>{t('Remove_confirmation.yes')}</Button>
                <Button variant="secondary" onClick={() => setBannerToRemove(null)}>{t('Remove_confirmation.no')}</Button>
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
                {banners.map(({ id, title, broadcastStart, broadcastEnd }) => (
                  <TableRow key={id}>
                    <TableCell className="align-middle">{title}</TableCell>
                    <TableCell className="align-middle">
                      {`${dayjs(broadcastStart).format(FORMAT_DATE_TIME)} ${dayjs(broadcastEnd).format(FORMAT_DATE_TIME)}`}
                    </TableCell>
                    <TableCell className="align-middle">
                      <Button variant="warning" className="m-0" onClick={() => setBannerToRemove({ title, id })}>
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
