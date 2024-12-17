import { useTranslations } from 'next-intl';

import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';

const ReentryAlertRiskThresholds = () => {
  const t = useTranslations('Reentry_alert.Risk_thresholds');

  return (
    <div>
      <p className="govuk-body">{t('content')}</p>
      <Table className="text-base">
        <TableHead>
          <TableRow>
            <TableCellHeader className="w-1/2">{t('risk_level')}</TableCellHeader>
            <TableCellHeader>{t('probability_of_reentry')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><Tag color="green">Low</Tag></TableCell>
            <TableCell>{t('risk.low')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Tag color="yellow">Medium</Tag></TableCell>
            <TableCell>{t('risk.medium')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Tag color="red">High</Tag></TableCell>
            <TableCell>{t('risk.high')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { ReentryAlertRiskThresholds };
