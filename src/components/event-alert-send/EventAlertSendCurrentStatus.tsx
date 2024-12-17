import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';
import { capitalized } from '@/utils/Helpers';

import type { EventAlertData, EventAlertType } from './EventAlertTypes';

type EventAlertSendCurrentStatusProps = {
  type: EventAlertType;
  detailsSummary: string;
  detailsContent: ReactNode;
  data: EventAlertData;
};

const EventAlertSendCurrentStatus = ({ type, detailsSummary, detailsContent, data }: EventAlertSendCurrentStatusProps) => {
  const t = useTranslations('Forms.Send_alert.Distibution_status');

  const { isPriority, additionalRecipients } = data;

  return (
    <div>
      <h3 className="govuk-heading-m">{t('title')}</h3>
      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader className="w-1/2">
              {t('using_distribution_lists')}
            </TableCellHeader>
            <TableCellHeader className="w-1/2">
              {t('status')}
            </TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCellHeader className="indent-10">
              {t('all_alerts', { type })}
            </TableCellHeader>
            <TableCell>
              <Tag className="max-w-none">{t('sent_to_distribution_list')}</Tag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="indent-10">
              {t('alert_for_uk', { type: capitalized(type) })}
            </TableCellHeader>
            <TableCell>
              <Tag className="max-w-none">{t('sent_to_distribution_list')}</Tag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="indent-10">
              {t('priority_alert', { type })}
            </TableCellHeader>
            <TableCell>
              {isPriority ? <Tag className="max-w-none">{t('sent_to_distribution_list')}</Tag> : <Tag color="grey" className="max-w-none">{t('not_sent to distribution list')}</Tag>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader colSpan={2}>
              {t('using_individual_emails')}
            </TableCellHeader>
          </TableRow>
          <TableRow>
            <TableCellHeader className="indent-10">
              {t('individually_selected_recipients')}
            </TableCellHeader>
            <TableCell>
              {additionalRecipients ?? '-'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Details summary={detailsSummary}>
        {detailsContent}
      </Details>
    </div>
  );
};

export { EventAlertSendCurrentStatus };
