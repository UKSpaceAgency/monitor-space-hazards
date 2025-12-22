import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

type EventSummaryData = Pick<TypeReentryEventOut, 'timeWindowStart' | 'timeWindowEnd' | 'decayEpoch' | 'uncertaintyWindow' | 'overflightTime' | 'survivability' | 'survivabilityComment' | 'objectName' | 'estimatedMass' | 'licenseCountry'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertExecutiveSummaryTable = ({ event }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_executive_summary');

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('time_window_world'),
    accessorKey: 'decayEpoch',
    renderCell: ({ decayEpoch, uncertaintyWindow }) => `${dayjs(decayEpoch).format(FORMAT_FULL_DATE_TIME)} +/- ${uncertaintyWindow} minute(s)`,
  }, {
    header: t('overflight_time'),
    accessorKey: 'overflightTime',
    renderCell: ({ overflightTime }) => overflightTime.length > 0 ? overflightTime.map(time => <span key={time} className="block">{dayjs(time).format(FORMAT_FULL_DATE_TIME)}</span>) : '-',
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
