import { isNumber } from 'lodash';
import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';

type EventSummaryData = Pick<TypeReentryEventOut, 'fragmentsProbability' | 'fragmentsRisk' | 'monteCarloProbability' | 'monteCarloRisk' | 'humanCasualtyProbability' | 'humanCasualtyRisk'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: EventSummaryData;
};

const ReentryAlertRiskProbabilitiesTable = ({ event }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_risk_probabilities');

  const classes = {
    Low: 'govuk-tag--green',
    Medium: 'govuk-tag--yellow',
    High: 'govuk-tag--red',
  };

  const renderTag = (risk: TypeReentryRisk | null | undefined) => risk
    ? (
        <Tag className={classes[risk as unknown as keyof typeof classes]}>
          {risk}
        </Tag>
      )
    : '-';

  return (
    <Table className="text-base">
      <TableHead>
        <TableRow>
          <TableCellHeader />
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
                  {renderTag(event.fragmentsRisk)}
                </TableCell>
              </TableRow>
            )
          : null}
        {isNumber(event.monteCarloProbability)
          ? (
              <TableRow>
                <TableCellHeader>{t('probability_of_atmospheric_entry')}</TableCellHeader>
                <TableCell>{roundedPercent(event.monteCarloProbability)}</TableCell>
                <TableCell>
                  {renderTag(event.monteCarloRisk)}
                </TableCell>
              </TableRow>
            )
          : null}
        {isNumber(event.humanCasualtyProbability)
          ? (
              <TableRow>
                <TableCellHeader>{t('probability_of_human_casualty')}</TableCellHeader>
                <TableCell>{roundedPercent(event.humanCasualtyProbability)}</TableCell>
                <TableCell>
                  {renderTag(event.humanCasualtyRisk)}
                </TableCell>
              </TableRow>
            )
          : null}
      </TableBody>
    </Table>
  );
};

export { ReentryAlertRiskProbabilitiesTable };
