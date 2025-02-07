import { useTranslations } from 'next-intl';
import type { HTMLProps } from 'react';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ObjectDetailsData = Pick<TypeReentryEventOut, 'internationalDesignator' | 'noradId' | 'objectHeight' | 'objectSpan' | 'launchingYear' | 'apogee' | 'perigee' | 'inclination'>;

type ReentryAlertAdditionalObjectDetailsTableProps = {
  event: TypeReentryEventOut;
  dataPdf?: string;
};

const ReentryAlertAdditionalObjectDetailsTable = ({ event, dataPdf }: ReentryAlertAdditionalObjectDetailsTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_additional_object_details');

  const objectDetailsHeaders: HTMLProps<HTMLTableCellElement>[] = [{
    children: t('object_details'),
  }, {}];

  const objectDetailsRows: InformationsTableRow<ObjectDetailsData>[] = [{
    header: t('international_designator'),
    accessorKey: 'internationalDesignator',
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('norad_id'),
    accessorKey: 'noradId',
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('object_dimensions'),
    renderCell: ({ objectHeight, objectSpan }) => `${t('height')} ${objectHeight}m x ${t('span')} ${objectSpan}m`,
    cellProps: {
      className: 'pl-10',
    },
  }, {
    header: t('launching_year'),
    accessorKey: 'launchingYear',
    cellProps: {
      className: 'pl-10',
    },
  }];

  const orbitDetailsHeaders: HTMLProps<HTMLTableCellElement>[] = [{
    children: t('orbit_details'),
  }, {}];

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
