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
};

const EphemerisesTable = ({ data }: EphemerisesTableProps) => {
  const t = useTranslations('Tables.Ephemerises');
  const [ephemerisToDelete, setEphemerisToDelete] = useState<{ id: string; fileName: string } | null>(null);

  const { mutate, isIdle, isSuccess, isPending } = useMutation({
    mutationKey: ['delete-ephemeris'],
    mutationFn: async (id: string) => {
      await deleteEphemeris(id);
    },
  });

  const downloadFile = async (id: string, fileName: string) => {
    const data = await getEphemeris(id);
    if (data) {
      const file = createTXT(data);
      saveAs(file, fileName);
    }
  };

  return (
    <div>
      {ephemerisToDelete && isIdle && (
        <NotificationBanner
          status="error"
          heading={t('Confirm_banner.title', { fileName: ephemerisToDelete.fileName })}
        >
          <div className="govuk-button-group">
            {ephemerisToDelete.id && (
              <Button className="govuk-button--warning" onClick={() => mutate(ephemerisToDelete.id)}>
                {t('Confirm_banner.yes')}
              </Button>
            )}
            <Button className="govuk-button--secondary" onClick={() => setEphemerisToDelete(null)}>
              {t('Confirm_banner.no')}
            </Button>
          </div>
        </NotificationBanner>
      )}
      {ephemerisToDelete && isSuccess && (
        <NotificationBanner status="success">
          {t('Success_banner.title', { fileName: ephemerisToDelete.fileName })}
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
          {data.map(({ id, fileName, startTime, stopTime, isActive }) => {
            const shortFileName = fileName.split('/').pop() || '';
            return (
              <TableRow key={id}>
                <TableCell>
                  {id && (
                    <button type="button" className="govuk-link text-blue" onClick={() => downloadFile(id, shortFileName)}>
                      {shortFileName}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {dayjs(startTime).format(FORMAT_DATE_TIME)}
                </TableCell>
                <TableCell>
                  {dayjs(stopTime).format(FORMAT_DATE_TIME)}
                </TableCell>
                <TableCell>
                  {!isActive
                    ? <Tag color="red">{t('deleted')}</Tag>
                    : (
                        <button type="button" className="govuk-link text-blue" onClick={() => id && setEphemerisToDelete({ id, fileName: shortFileName })} disabled={isPending}>
                          {t('delete')}
                          <span className="govuk-visually-hidden">
                            {fileName}
                          </span>
                        </button>
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
