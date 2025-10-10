import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

type ObjectDetailsData = Pick<TypeSatelliteOut, 'commonName' | 'noradId' | 'internationalDesignator' | 'objectType' | 'mass' | 'launchSite' | 'launchDate'>;

type FragmentationObjectDetailsTableProps = {
  object: TypeSatelliteOut;
};

const FragmentationObjectDetailsTable = ({ object }: FragmentationObjectDetailsTableProps) => {
  const t = useTranslations('Tables.Fragmentation_object_details');

  const rows: InformationsTableRow<ObjectDetailsData>[] = [
    {
      header: t('common_name'),
      accessorKey: 'commonName',
    },
    {
      header: t('norad_id'),
      accessorKey: 'noradId',
    },
    {
      header: t('international_designator'),
      accessorKey: 'internationalDesignator',
    },
    {
      header: t('object_type'),
      accessorKey: 'objectType',
    },
    {
      header: t('mass'),
      accessorKey: 'mass',
    },
    {
      header: t('launch_site'),
      accessorKey: 'launchSite',
      renderCell: ({ launchSite }) => getFullCountry(launchSite),
    },
    {
      header: t('launch_date'),
      accessorKey: 'launchDate',
      renderCell: ({ launchDate }) => dayjs(launchDate).format('YYYY'),
    },
  ];

  return <InformationsTable rows={rows} data={object} className="text-base" />;
};

export { FragmentationObjectDetailsTable };
