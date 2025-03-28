import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

type EventSummaryData = Pick<TypeReentryEventOut, 'timeWindowStart' | 'timeWindowEnd' | 'overflightTime' | 'survivability' | 'survivabilityComment' | 'objectName' | 'estimatedMass' | 'licenseCountry'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertExecutiveSummaryTable = ({ event }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_executive_summary');

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('time_window_world'),
    accessorKey: 'timeWindowStart',
    renderCell: ({ timeWindowStart, timeWindowEnd }) => `${dayjs(timeWindowStart).format(FORMAT_DATE_TIME)} to ${dayjs(timeWindowEnd).format(FORMAT_DATE_TIME)}`,
  }, {
    header: t('overflight_time'),
    accessorKey: 'overflightTime',
    renderCell: ({ overflightTime }) => overflightTime[0] ? dayjs(overflightTime[0]).format(FORMAT_DATE_TIME) : '-',
  }, {
    header: t('survivability_comment'),
    accessorKey: 'survivabilityComment',
    renderCell: ({ survivability, survivabilityComment }) => `${survivability ? `${survivability}. ` : ''}${survivabilityComment}`,
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

  return <InformationsTable rows={rows} data={event} className="text-base" />;
};

export { ReentryAlertExecutiveSummaryTable };
