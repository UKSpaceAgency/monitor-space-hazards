'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import { Table, TableBody, TableCell, TableCellHeader, TableRow } from '@/ui/table/Table';
import { getBackUrl } from '@/utils/Helpers';

import type { EventAlertSearchParams, EventAlertType } from './EventAlertTypes';

type EventAlertSendReviewProps = {
  type: EventAlertType;
  shortId: string;
  data: EventAlertSearchParams;
  action: (id: string, data: { alertType: any[]; additionalEmails: string[] }) => Promise<void>;
};

const EventAlertSendReview = ({ type, shortId, data, action }: EventAlertSendReviewProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const t = useTranslations('Forms.Send_alert.Review');

  const prevPageUrl = getBackUrl(pathname, 1, searchParams);

  const handleSubmit = () => {
    setLoading(true);

    const alertType = [
      data.isStandard === 'true' ? 'standard' : null,
      data.isUkSatellitesOnly === 'true' ? 'uk_satellites_only' : null,
      data.isPriority === 'true' ? 'priority' : null,
    ].filter(Boolean) as ('standard' | 'priority' | 'uk_satellites_only' | 'closedown')[];

    action(shortId, {
      alertType,
      additionalEmails: data.additionalRecipients ? data.additionalRecipients.split(/[,;]+/).map(r => r.trim()) : [],
    });
  };

  return (
    <div>
      <h1 className="govuk-heading-xl mb-6">
        {t('title')}
      </h1>
      <Table>
        <TableBody>
          <TableRow>
            <TableCellHeader className="w-1/3">{t('make_this_standard', { type })}</TableCellHeader>
            <TableCell>{data.isStandard === 'true' ? 'Yes' : 'No'}</TableCell>
            <TableCell className="w-20 text-right"><Link className="govuk-link" href={prevPageUrl}>{t('change')}</Link></TableCell>
          </TableRow>
          {type === 're-entry' && (
            <TableRow>
              <TableCellHeader className="w-1/3">{t('make_this_uk_satellites_only', { type })}</TableCellHeader>
              <TableCell>{data.isUkSatellitesOnly === 'true' ? 'Yes' : 'No'}</TableCell>
              <TableCell className="w-20 text-right"><Link className="govuk-link" href={prevPageUrl}>{t('change')}</Link></TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCellHeader className="w-1/3">{t('make_this_priority', { type })}</TableCellHeader>
            <TableCell>{data.isPriority === 'true' ? 'Yes' : 'No'}</TableCell>
            <TableCell className="w-20 text-right"><Link className="govuk-link" href={prevPageUrl}>{t('change')}</Link></TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-1/3">{t('send_alerts_to_selected_users')}</TableCellHeader>
            <TableCell className="text-ellipsis">{data.additionalRecipients.split(/[,;]+/).join('; ') || '-'}</TableCell>
            <TableCell className="w-20 text-right"><Link className="govuk-link" href={prevPageUrl}>{t('change')}</Link></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="govuk-body">{t('hint')}</p>
      <ButtonGroup>
        <Button onClick={handleSubmit} disabled={loading} aria-label={t('send_alerts')}>{t('send_alerts')}</Button>
        <Button as="link" href={prevPageUrl} variant="secondary" aria-label={t('return')}>{t('return')}</Button>
      </ButtonGroup>
    </div>
  );
};

export { EventAlertSendReview };
