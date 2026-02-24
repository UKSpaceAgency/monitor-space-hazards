import { useTranslations } from 'next-intl';
import type { HTMLProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ObjectDetailsData = Pick<TypeReentryEventOut, 'international_designator' | 'norad_id' | 'object_height' | 'object_span' | 'launching_year' | 'apogee' | 'perigee' | 'inclination'>;

type ReentryAlertAdditionalObjectDetailsTableProps = {
  event: TypeReentryEventOut;
  dataPdf?: string;
};

const ReentryAlertAdditionalObjectDetailsTable = ({ event, dataPdf }: ReentryAlertAdditionalObjectDetailsTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_additional_object_details');

  const objectDetailsHeaders: HTMLProps<HTMLTableCellElement>[] = [{
    children: t('object_details'),
    colSpan: 2,
  }];

  const objectDetailsRows: InformationsTableRow<ObjectDetailsData>[] = [{
    header: t('international_designator'),
    accessorKey: 'international_designator',
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('norad_id'),
    accessorKey: 'norad_id',
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('object_dimensions'),
    renderCell: ({ object_height, object_span }) => object_height && object_span ? `${t('height')} ${object_height}m x ${t('span')} ${object_span}m` : '-',
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('launching_year'),
    accessorKey: 'launching_year',
    cellProps: {
      className: 'pl-10',
    },
  }];

  const orbitDetailsHeaders: HTMLProps<HTMLTableCellElement>[] = [{
    children: t('orbit_details'),
    colSpan: 2,
  }];

  const orbitDetailsRows: InformationsTableRow<ObjectDetailsData>[] = [
    {
      header: t('apogee'),
      accessorKey: 'apogee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('perigee'),
      accessorKey: 'perigee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('inclination'),
      accessorKey: 'inclination',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
  ];

  return (
    <div data-pdf={dataPdf}>
      <InformationsTable className="mb-0" headers={objectDetailsHeaders} rows={objectDetailsRows} data={event} />
      <InformationsTable headers={orbitDetailsHeaders} rows={orbitDetailsRows} data={event} />
    </div>

  );
};

export { ReentryAlertAdditionalObjectDetailsTable };
