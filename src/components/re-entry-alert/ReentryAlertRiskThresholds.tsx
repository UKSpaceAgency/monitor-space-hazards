import { useTranslations } from 'next-intl';

import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';

type ReentryAlertRiskThresholdsProps = {
  dataPdf?: string;
};

const ReentryAlertRiskThresholds = ({ dataPdf }: ReentryAlertRiskThresholdsProps) => {
  const t = useTranslations('Reentry_alert.Risk_thresholds');

  return (
    <div data-pdf={dataPdf}>
      <p className="govuk-body">{t('content')}</p>
      <div className="overflow-x-auto">
        <Table className="text-sm md:text-base">
          <TableHead>
            <TableRow>
              <TableCellHeader className="md:w-28">{t('risk_level')}</TableCellHeader>
              <TableCellHeader>{t('probability_of_ground')}</TableCellHeader>
              <TableCellHeader>{t('probability_of_atmospheric')}</TableCellHeader>
              {/* <TableCellHeader>{t('probability_of_human_casualty')}</TableCellHeader> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><Tag color="green">Low</Tag></TableCell>
              <TableCell>{t('risk.low', { value: 2 })}</TableCell>
              <TableCell>{t('risk.low', { value: 1 })}</TableCell>
              {/* <TableCell>{t('risk.low', { value: 0.1 })}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell><Tag color="yellow">Medium</Tag></TableCell>
              <TableCell>{t('risk.medium', { from: 2, to: 10 })}</TableCell>
              <TableCell>{t('risk.medium', { from: 1, to: 5 })}</TableCell>
              {/* <TableCell>{t('risk.medium', { from: 0.1, to: 1 })}</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell><Tag color="red">High</Tag></TableCell>
              <TableCell>{t('risk.high', { value: 10 })}</TableCell>
              <TableCell>{t('risk.high', { value: 5 })}</TableCell>
              {/* <TableCell>{t('risk.high', { value: 1 })}</TableCell> */}
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
