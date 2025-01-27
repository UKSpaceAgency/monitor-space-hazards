import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Tag from '@/ui/tag/tag';
import { roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

type EventSummaryData = Pick<TypeReentryEventOut, 'ukReentryProbability' | 'probability' | 'timeWindowStart' | 'timeWindowEnd' | 'overflightTime' | 'survivability' | 'survivabilityComment' | 'objectName' | 'estimatedMass' | 'licenseCountry'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertExecutiveSummaryTable = ({ event }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_executive_summary');

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('uk_reentry_probability'),
    accessorKey: 'ukReentryProbability',
    renderCell: ({ ukReentryProbability }) => {
      const classes = {
        Low: 'govuk-tag--green',
        Medium: 'govuk-tag--yellow',
        High: 'govuk-tag--red',
      };

      return ukReentryProbability
        ? (
            <Tag className={classes[ukReentryProbability as unknown as keyof typeof classes]}>
              {ukReentryProbability}
            </Tag>
          )
        : (
            <Tag>N/A</Tag>
          );
    },
  }, {
    header: t('probability'),
    accessorKey: 'probability',
    renderCell: ({ probability }) => (probability ? roundedPercent(probability) : '-'),
  }, {
    header: t('time_window_world'),
    accessorKey: 'timeWindowStart',
    renderCell: ({ timeWindowStart, timeWindowEnd }) => `${dayjs(timeWindowStart).format(FORMAT_DATE_TIME)} to ${dayjs(timeWindowEnd).format(FORMAT_DATE_TIME)}`,
  }, {
    header: t('overflight_time'),
    accessorKey: 'overflightTime',
    renderCell: ({ overflightTime }) => overflightTime[0] ? dayjs(overflightTime[0]).format(FORMAT_DATE_TIME) : 'Unknown',
  }, {
    header: t('survivability_comment'),
    accessorKey: 'survivabilityComment',
    renderCell: ({ survivability, survivabilityComment }) => (
      <span>
        {survivability && (
          <span className="mr-1">
            {survivability}
            .
          </span>
        )}
        <span>{survivabilityComment}</span>
      </span>
    ),
  }, {
    header: t('object'),
    accessorKey: 'objectName',
  }, {
    header: t('estimated_mass'),
    accessorKey: 'estimatedMass',
  }, {
    header: t('licensing_country'),
    accessorKey: 'licenseCountry',
    renderCell: ({ licenseCountry }) => getFullCountry(licenseCountry),
  }];

  return <InformationsTable rows={rows} data={event} />;
};

export { ReentryAlertExecutiveSummaryTable };
