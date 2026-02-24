import { isNumber } from 'lodash';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Tags';

type EventSummaryData = Pick<TypeReentryEventOut, 'fragments_probability' | 'fragments_risk' | 'atmospheric_probability' | 'atmospheric_risk' | 'human_casualty_probability' | 'human_casualty_risk'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: EventSummaryData;
};

const ReentryAlertRiskProbabilitiesTable = ({ event }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_risk_probabilities');

  return (
    <div>
      <Table className="text-base">
        <TableHead>
          <TableRow>
            <TableCellHeader><div className="hidden">{t('description')}</div></TableCellHeader>
            <TableCellHeader>{t('probability')}</TableCellHeader>
            <TableCellHeader>{t('risk')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {isNumber(event.fragments_probability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_fragmentation')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.fragments_probability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.fragments_risk ?? 'None')}
                  </TableCell>
                </TableRow>
              )
            : null}
          {isNumber(event.atmospheric_probability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_atmospheric_entry')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.atmospheric_probability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.atmospheric_risk ?? 'None')}
                  </TableCell>
                </TableRow>
              )
            : null}
          {/* {isNumber(event.human_casualty_probability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_human_casualty')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.human_casualty_probability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.human_casualty_risk)}
                  </TableCell>
                </TableRow>
              )
            : null} */}
        </TableBody>
      </Table>
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { ReentryAlertRiskProbabilitiesTable };
