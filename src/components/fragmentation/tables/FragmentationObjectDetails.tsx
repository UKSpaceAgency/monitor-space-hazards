import { useTranslations } from 'next-intl';

import type { TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { getFullCountry } from '@/utils/Regions';

type ObjectDetailsData = Pick<TypeFragmentationReportOut, 'primary_object_common_name' | 'primary_object_norad_id' | 'primary_object_international_designator' | 'primary_object_type' | 'primary_object_mass' | 'primary_object_launching_year' | 'primary_object_licensing_country' | 'primary_object_apogee' | 'primary_object_perigee' | 'primary_object_inclination' | 'secondary_object_common_name' | 'secondary_object_norad_id' | 'secondary_object_international_designator' | 'secondary_object_type' | 'secondary_object_mass' | 'secondary_object_launching_year' | 'secondary_object_licensing_country' | 'secondary_object_apogee' | 'secondary_object_perigee' | 'secondary_object_inclination'>;

type FragmentationObjectDetailsTableProps = {
  report: TypeFragmentationReportOut;
};

const FragmentationObjectDetailsTable = ({ report }: FragmentationObjectDetailsTableProps) => {
  const t = useTranslations('Tables.Fragmentation_object_details');

  const primaryObjectRows: InformationsTableRow<ObjectDetailsData>[] = [
    {
      header: t('primary_object_details'),
      accessorKey: 'primary_object_common_name',
    },
    {
      header: t('object_type'),
      accessorKey: 'primary_object_type',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('launch_site'),
      accessorKey: 'primary_object_licensing_country',
      renderCell: ({ primary_object_licensing_country }) => getFullCountry(primary_object_licensing_country),
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('mass'),
      accessorKey: 'primary_object_mass',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('international_designator'),
      accessorKey: 'primary_object_international_designator',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('norad_id'),
      accessorKey: 'primary_object_norad_id',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('launch_date'),
      accessorKey: 'primary_object_launching_year',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('apogee'),
      accessorKey: 'primary_object_apogee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('perigee'),
      accessorKey: 'primary_object_perigee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('inclination'),
      accessorKey: 'primary_object_inclination',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
  ];

  const secondaryObjectRows: InformationsTableRow<ObjectDetailsData>[] = [
    {
      header: t('secondary_object_details'),
      accessorKey: 'secondary_object_common_name',
    },
    {
      header: t('object_type'),
      accessorKey: 'secondary_object_type',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('launch_site'),
      accessorKey: 'secondary_object_licensing_country',
      renderCell: ({ primary_object_licensing_country }) => getFullCountry(primary_object_licensing_country),
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('mass'),
      accessorKey: 'secondary_object_mass',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('international_designator'),
      accessorKey: 'secondary_object_international_designator',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('norad_id'),
      accessorKey: 'secondary_object_norad_id',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('launch_date'),
      accessorKey: 'secondary_object_launching_year',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('apogee'),
      accessorKey: 'secondary_object_apogee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('perigee'),
      accessorKey: 'secondary_object_perigee',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
    {
      header: t('inclination'),
      accessorKey: 'secondary_object_inclination',
      cellProps: {
        className: 'pl-10',
        width: '50%',
      },
    },
  ];

  const rows = report.secondary_object_common_name ? [...primaryObjectRows, ...secondaryObjectRows] : primaryObjectRows;

  return <InformationsTable rows={rows} data={report} className="text-base" />;
};

export { FragmentationObjectDetailsTable };
