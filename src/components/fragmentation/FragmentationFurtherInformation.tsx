import { useTranslations } from 'next-intl';

import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { renderRiskTag } from '@/utils/Risk';

type FragmentationFurtherInformationProps = {
  dataPdf?: string;
};

const FragmentationFurtherInformation = ({ dataPdf }: FragmentationFurtherInformationProps) => {
  const t = useTranslations('Fragmentation.Further_information');

  return (
    <div data-pdf={dataPdf}>
      <p className="govuk-body">{t('content')}</p>
      <div className="overflow-x-auto">
        <Table className="text-sm md:text-base">
          <TableHead>
            <TableRow>
              <TableCellHeader className="md:w-1/2">{t('risk_level')}</TableCellHeader>
              <TableCellHeader>{t('potential')}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{renderRiskTag('Low')}</TableCell>
              <TableCell>{t('risk.low', { value: 1 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('Medium')}</TableCell>
              <TableCell>{t('risk.medium', { from: 1, to: 5 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{renderRiskTag('High')}</TableCell>
              <TableCell>{t('risk.high', { value: 5 })}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {t.rich('footer')}
    </div>
  );
};

export { FragmentationFurtherInformation };
