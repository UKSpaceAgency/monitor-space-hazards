import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { HTMLProps } from 'react';

import type { TypeActivityEvent } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type EventSummaryData = Pick<TypeActivityEvent, 'common_name' | 'norad_id' | 'international_designator' | 'operator' | 'reason_for_flag' | 'flag_date' | 'latest_tle_epoch'>;

type ActivityEventSummaryTableProps = {
  event: TypeActivityEvent;
};

const ActivityEventSummaryTable = ({ event }: ActivityEventSummaryTableProps) => {
  const t = useTranslations('Tables.Activity_event_summary');

  const objectInformationHeaders: HTMLProps<HTMLTableCellElement>[] = [{ children: 'Object Information', colSpan: 2 }];

  const objectInformationRows: InformationsTableRow<EventSummaryData>[] = [{
    header: t('common_name'),
    accessorKey: 'common_name',
    renderCell: row => <Link href={`/satellites/${row.norad_id}`}>{row.common_name}</Link>,
  }, {
    header: t('norad_id'),
    accessorKey: 'norad_id',
  }, {
    header: t('international_designator'),
    accessorKey: 'international_designator',
  }, {
    header: t('operator'),
    accessorKey: 'operator',
  }];

  return <InformationsTable headers={objectInformationHeaders} rows={objectInformationRows} data={event} />;
};

export { ActivityEventSummaryTable };
