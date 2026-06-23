import { isNumber } from 'lodash';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import Details from '@/ui/details/details';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { roundedPercent } from '@/utils/Math';
import { getReentryFragmentsProbability, getReentryFragmentsRisk } from '@/utils/ReentryRisk';
import { renderRiskTag } from '@/utils/Tags';

type EventSummaryData = Pick<TypeReentryEventOut, 'fragments_probability' | 'atmospheric_probability' | 'atmospheric_risk' | 'human_casualty_probability' | 'human_casualty_risk'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: EventSummaryData;
  report: Pick<TypeReentryEventReportOut, 'impact'>;
};

const ReentryAlertRiskProbabilitiesTable = ({ event, report }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_risk_probabilities');
  const fragmentsProbability = getReentryFragmentsProbability(event.fragments_probability, report.impact);
  const fragmentsRisk = getReentryFragmentsRisk(event.fragments_probability, report.impact);

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
          {isNumber(fragmentsProbability)
            ? (
                <TableRow>
                  <TableCellHeader>{t('probability_of_fragmentation')}</TableCellHeader>
                  <TableCell>{roundedPercent(fragmentsProbability)}</TableCell>
                  <TableCell>
                    {renderRiskTag(fragmentsRisk)}
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
                    {fragmentsRisk}
                    {renderRiskTag(event.atmospheric_risk ?? 'None')}
                    fff
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
