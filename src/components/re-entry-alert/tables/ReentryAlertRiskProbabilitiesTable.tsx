import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';

type EventSummaryData = Pick<TypeReentryEventOut, 'fragmentsProbability' | 'fragmentsRisk' | 'monteCarloProbability' | 'monteCarloRisk' | 'humanCasualtyProbability' | 'humanCasualtyRisk'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: EventSummaryData;
};

// header: t('uk_reentry_probability'),
// accessorKey: 'ukReentryProbability',
// renderCell: ({ ukReentryProbability }) => {
//   const classes = {
//     Low: 'govuk-tag--green',
//     Medium: 'govuk-tag--yellow',
//     High: 'govuk-tag--red',
//   };

//   return ukReentryProbability
//     ? (
//         <Tag className={classes[ukReentryProbability as unknown as keyof typeof classes]}>
//           {ukReentryProbability}
//         </Tag>
//       )
//     : (
//         <Tag>N/A</Tag>
//       );
// },
// }, {
// header: t('probability'),
// accessorKey: 'probability',
// renderCell: ({ probability }) => (probability ? roundedPercent(probability) : '-'),
// },

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
        <TableRow>
          <TableCellHeader>{t('probability_of_atmospheric_entry')}</TableCellHeader>
          <TableCell>{event.monteCarloProbability ? roundedPercent(event.monteCarloProbability) : '-'}</TableCell>
          <TableCell>
            {renderTag(event.monteCarloRisk)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCellHeader>{t('probability_of_fragmentation')}</TableCellHeader>
          <TableCell>{event.fragmentsProbability ? roundedPercent(event.fragmentsProbability) : '-'}</TableCell>
          <TableCell>
            {renderTag(event.fragmentsRisk)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCellHeader>{t('probability_of_human_casualty')}</TableCellHeader>
          <TableCell>{event.humanCasualtyProbability ? roundedPercent(event.humanCasualtyProbability) : '-'}</TableCell>
          <TableCell>
            {renderTag(event.humanCasualtyRisk)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { ReentryAlertRiskProbabilitiesTable };
