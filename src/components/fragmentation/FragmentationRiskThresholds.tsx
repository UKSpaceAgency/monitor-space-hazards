import { useTranslations } from 'next-intl';

import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { renderRiskTag } from '@/utils/Tags';

type FragmentationRiskThresholdsProps = {
  dataPdf?: string;
};

const FragmentationRiskThresholds = ({ dataPdf }: FragmentationRiskThresholdsProps) => {
  const t = useTranslations('Fragmentation.Risk_thresholds');

  return (
    <div data-pdf={dataPdf}>
      <p className="govuk-body">{t('content')}</p>
      <div className="overflow-x-auto">
        <Table className="text-sm md:text-base">
          <TableHead>
            <TableRow>
              <TableCellHeader className="md:w-1/2">{t('risk_level')}</TableCellHeader>
              <TableCellHeader>{t('number_of_fragments')}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{renderRiskTag('Low')}</TableCell>
              <TableCell>{t('risk.low', { value: 50 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('Medium')}</TableCell>
              <TableCell>{t('risk.medium', { from: 50, to: 500 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('High')}</TableCell>
              <TableCell>{t('risk.high', { value: 500 })}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { FragmentationRiskThresholds };
