import { useTranslations } from 'next-intl';

import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';

type ConjunctionAlertRiskThresholdsProps = {
  dataPdf?: string;
};

const ConjunctionAlertRiskThresholds = ({ dataPdf }: ConjunctionAlertRiskThresholdsProps) => {
  const t = useTranslations('Conjunction_alert.Risk_thresholds');

  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
      <Table>
        <TableHead>
          <TableRow className="govuk-body-s">
            <TableCell className="w-1/3" />
            <TableCellHeader colSpan={3}>{t('probability_of_collision.title')}</TableCellHeader>
            <TableCellHeader></TableCellHeader>
            <TableCellHeader></TableCellHeader>
          </TableRow>
          <TableRow className="govuk-body-s">
            <TableCellHeader>{t('probability_of_collision.title')}</TableCellHeader>
            <TableCellHeader>{t('probability_of_collision.low')}</TableCellHeader>
            <TableCellHeader>{t('probability_of_collision.medium')}</TableCellHeader>
            <TableCellHeader>{t('probability_of_collision.high')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="govuk-body-s">
            <TableCellHeader>{t('predicted_conjunctions.low')}</TableCellHeader>
            <TableCell><Tag color="turquoise">Very Low</Tag></TableCell>
            <TableCell><Tag color="green">Low</Tag></TableCell>
            <TableCell><Tag color="yellow">Medium</Tag></TableCell>
          </TableRow>
          <TableRow className="govuk-body-s">
            <TableCellHeader>{t('predicted_conjunctions.medium')}</TableCellHeader>
            <TableCell><Tag color="green">Low</Tag></TableCell>
            <TableCell><Tag color="yellow">Medium</Tag></TableCell>
            <TableCell><Tag color="red">High</Tag></TableCell>
          </TableRow>
          <TableRow className="govuk-body-s">
            <TableCellHeader>{t('predicted_conjunctions.high')}</TableCellHeader>
            <TableCell><Tag color="yellow">Medium</Tag></TableCell>
            <TableCell><Tag color="red">High</Tag></TableCell>
            <TableCell><Tag color="red">High</Tag></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { ConjunctionAlertRiskThresholds };
