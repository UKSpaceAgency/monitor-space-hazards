import { isNumber } from 'lodash';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { roundedPercent } from '@/utils/Math';
import { renderRiskTag } from '@/utils/Risk';

type EventSummaryData = Pick<TypeReentryEventOut, 'fragmentsProbability' | 'fragmentsRisk' | 'atmosphericProbability' | 'atmosphericRisk' | 'humanCasualtyProbability' | 'humanCasualtyRisk'>;

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
          {isNumber(event.fragmentsProbability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_fragmentation')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.fragmentsProbability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.fragmentsRisk)}
                  </TableCell>
                </TableRow>
              )
            : null}
          {isNumber(event.atmosphericProbability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_atmospheric_entry')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.atmosphericProbability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.atmosphericRisk)}
                  </TableCell>
                </TableRow>
              )
            : null}
          {/* {isNumber(event.humanCasualtyProbability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_human_casualty')}</TableCellHeader>
                  <TableCell>{roundedPercent(event.humanCasualtyProbability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(event.humanCasualtyRisk)}
                  </TableCell>
                </TableRow>
              )
            : null} */}
        </TableBody>
      </Table>
      <Details summary={t('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { ReentryAlertRiskProbabilitiesTable };
