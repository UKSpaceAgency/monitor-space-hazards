import { useTranslations } from 'next-intl';

import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { renderRiskTag } from '@/utils/Tags';

type ReentryAlertRiskThresholdsProps = {
  dataPdf?: string;
};

const ReentryAlertRiskThresholds = ({ dataPdf }: ReentryAlertRiskThresholdsProps) => {
  const t = useTranslations('Reentry_alert.Risk_thresholds');

  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
      <div className="overflow-x-auto">
        <Table className="text-sm md:text-base">
          <TableHead>
            <TableRow>
              <TableCellHeader className="md:w-1/3">{t('risk_level')}</TableCellHeader>
              <TableCellHeader>{t('probability_of_debris')}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{renderRiskTag('Pending')}</TableCell>
              <TableCell>{t('risk.not_completed')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('None')}</TableCell>
              <TableCell>{t('risk.equal', { value: 0 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('Very low')}</TableCell>
              <TableCell>{t('risk.between', { from: 0, to: 0.1 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('Low')}</TableCell>
              <TableCell>{t('risk.between', { from: 0.1, to: 1 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('Medium')}</TableCell>
              <TableCell>{t('risk.between', { from: 1, to: 5 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('High')}</TableCell>
              <TableCell>{t('risk.more_than', { value: 5 })}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Details
        summary={t.rich('details.title')}
      >
        {t.rich('details.content')}
      </Details>
    </div>
  );
};

export { ReentryAlertRiskThresholds };
