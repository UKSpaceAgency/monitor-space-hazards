import { useTranslations } from 'next-intl';

import type { TypeFragmentationReport } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

type EventDetailsData = Pick<TypeFragmentationReport, 'event_epoch' | 'primary_object_inclination' | 'known_fragments' | 'modelled_fragments' | 'primary_object_apogee' | 'primary_object_perigee'>;

type FragmentationEventDetailsTableProps = {
  report: TypeFragmentationReport;
};

const FragmentationEventDetailsTable = ({ report }: FragmentationEventDetailsTableProps) => {
  const t = useTranslations('Tables.Fragmentation_event_details');

  const rows: InformationsTableRow<EventDetailsData>[] = [
    {
      header: t('event_time'),
      accessorKey: 'event_epoch',
      renderCell: ({ event_epoch }) => dayjs(event_epoch).format(FORMAT_DATE_TIME),
    },
    {
      header: t('inclination'),
      accessorKey: 'primary_object_inclination',
    },
    {
      header: t('known_fragments'),
      accessorKey: 'known_fragments',
    },
    {
      header: t('modelled_fragments'),
      accessorKey: 'modelled_fragments',
    },
    {
      header: t('primary_object_apogee'),
      accessorKey: 'primary_object_apogee',
    },
    {
      header: t('primary_object_perigee'),
      accessorKey: 'primary_object_perigee',
    },
  ];

  return <InformationsTable rows={rows} data={report} className="text-base" />;
};

export { FragmentationEventDetailsTable };
