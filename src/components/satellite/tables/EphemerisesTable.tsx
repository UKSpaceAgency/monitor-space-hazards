'use client';

import { useMutation } from '@tanstack/react-query';
import saveAs from 'file-saver';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { TypeEphemerisOut } from '@/__generated__/data-contracts';
import { deleteEphemeris } from '@/actions/deleteEphemeris';
import { getEphemeris } from '@/actions/getEphemeris';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { createTXT } from '@/libs/File';
import Button from '@/ui/button/button';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';

type EphemerisesTableProps = {
  data: TypeEphemerisOut[];
  showDeleteButton: boolean;
};

const EphemerisesTable = ({ data, showDeleteButton }: EphemerisesTableProps) => {
  const t = useTranslations('Tables.Ephemerises');
  const [ephemerisToDelete, setEphemerisToDelete] = useState<{ id: string; file_name: string } | null>(null);

  const { mutate, isIdle, isSuccess, isPending } = useMutation({
    mutationKey: ['delete-ephemeris'],
    mutationFn: async (id: string) => {
      await deleteEphemeris(id);
    },
  });

  const downloadFile = async (id: string, file_name: string) => {
    const data = await getEphemeris(id);
    if (data) {
      const file = createTXT(data);
      saveAs(file, file_name);
    }
  };

  return (
    <div>
      {ephemerisToDelete && isIdle && (
        <NotificationBanner
          status="error"
          heading={t('Confirm_banner.title', { file_name: ephemerisToDelete.file_name })}
          aria-label="Ephemeris delete banner"
        >
          <div className="govuk-button-group">
            {ephemerisToDelete.id && (
              <Button className="govuk-button--warning" onClick={() => mutate(ephemerisToDelete.id)} aria-label={`Yes, delete ${ephemerisToDelete.file_name}`}>
                {t('Confirm_banner.yes')}
              </Button>
            )}
            <Button className="govuk-button--secondary" onClick={() => setEphemerisToDelete(null)} aria-label={`Cancel, deleting ${ephemerisToDelete.file_name}`}>
              {t('Confirm_banner.no')}
            </Button>
          </div>
        </NotificationBanner>
      )}
      {ephemerisToDelete && isSuccess && (
        <NotificationBanner status="success" aria-label="Ephemeris success banner">
          {t('Success_banner.title', { file_name: ephemerisToDelete.file_name })}
        </NotificationBanner>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>
              {t('file_name')}
            </TableCellHeader>
            <TableCellHeader>
              {t('start_time')}
            </TableCellHeader>
            <TableCellHeader>
              {t('stop_time')}
            </TableCellHeader>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, file_name, start_time, stop_time, is_active }) => {
            const shortFileName = file_name.split('/').pop() || '';
            return (
              <TableRow key={id}>
                <TableCell>
                  {id && (
                    <button type="button" className="govuk-link text-blue" onClick={() => downloadFile(id, shortFileName)} aria-label={shortFileName}>
                      {shortFileName}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {dayjs(start_time).format(FORMAT_DATE_TIME)}
                </TableCell>
                <TableCell>
                  {dayjs(stop_time).format(FORMAT_DATE_TIME)}
                </TableCell>
                <TableCell>
                  {!is_active
                    ? <Tag color="red">{t('deleted')}</Tag>
                    : (
                        showDeleteButton
                          ? (
                              <button type="button" className="govuk-link text-blue" onClick={() => id && setEphemerisToDelete({ id, file_name: shortFileName })} disabled={isPending} aria-label={t('delete')}>
                                {t('delete')}
                                <span className="govuk-visually-hidden">
                                  {file_name}
                                </span>
                              </button>
                            )
                          : null
                      )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

  );
};

export { EphemerisesTable };
