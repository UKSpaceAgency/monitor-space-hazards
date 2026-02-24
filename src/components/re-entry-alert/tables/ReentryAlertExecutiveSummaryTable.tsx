import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

type EventSummaryData = Pick<TypeReentryEventOut, 'time_window_start' | 'time_window_end' | 'decay_epoch' | 'uncertainty_window' | 'overflight_time' | 'survivability' | 'survivability_comment' | 'object_name' | 'estimated_mass' | 'license_country'>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
};

const ReentryAlertExecutiveSummaryTable = ({ event, report }: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_executive_summary');

  const data = {
    ...event,
    decay_epoch: report.decay_epoch,
    uncertainty_window: report.uncertainty_window,
  };

  const rows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('time_window_world'),
    accessorKey: 'decay_epoch',
    renderCell: ({ decay_epoch, uncertainty_window }) => `${dayjs(decay_epoch).format(FORMAT_FULL_DATE_TIME)} +/- ${uncertainty_window} minute(s)`,
  }, {
    header: t('overflight_time'),
    accessorKey: 'overflight_time',
    renderCell: ({ overflight_time }) => overflight_time.length > 0 ? overflight_time.map(time => <span key={time} className="block">{dayjs(time).format(FORMAT_FULL_DATE_TIME)}</span>) : '-',
  }, {
    header: t('survivability_comment'),
    accessorKey: 'survivability_comment',
    renderCell: ({ survivability, survivability_comment }) => `${survivability ? `${survivability}. ` : ''}${survivability_comment}`,
  }, {
    header: t('object'),
    accessorKey: 'object_name',
  }, {
    header: t('estimated_mass'),
    accessorKey: 'estimated_mass',
  }, {
    header: t('licensing_country'),
    accessorKey: 'license_country',
    renderCell: ({ license_country }) => getFullCountry(license_country),
  }];

  return <InformationsTable rows={rows} data={data} className="text-base" />;
};

export { ReentryAlertExecutiveSummaryTable };
