import { useTranslations } from 'next-intl';

import type { TypeFragmentationReport } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { getFullCountry } from '@/utils/Regions';

type ObjectDetailsData = Pick<TypeFragmentationReport, 'primary_object_common_name' | 'primary_object_norad_id' | 'primary_object_international_designator' | 'primary_object_type' | 'primary_object_mass' | 'primary_object_launching_year' | 'primary_object_licensing_country'>;

type FragmentationObjectDetailsTableProps = {
  report: TypeFragmentationReport;
};

const FragmentationObjectDetailsTable = ({ report }: FragmentationObjectDetailsTableProps) => {
  const t = useTranslations('Tables.Fragmentation_object_details');

  const rows: InformationsTableRow<ObjectDetailsData>[] = [
    {
      header: t('common_name'),
      accessorKey: 'primary_object_common_name',
    },
    {
      header: t('norad_id'),
      accessorKey: 'primary_object_norad_id',
    },
    {
      header: t('international_designator'),
      accessorKey: 'primary_object_international_designator',
    },
    {
      header: t('object_type'),
      accessorKey: 'primary_object_type',
    },
    {
      header: t('mass'),
      accessorKey: 'primary_object_mass',
    },
    {
      header: t('launch_site'),
      accessorKey: 'primary_object_licensing_country',
      renderCell: ({ primary_object_licensing_country }) => getFullCountry(primary_object_licensing_country),
    },
    {
      header: t('launch_date'),
      accessorKey: 'primary_object_launching_year',
    },
  ];

  return <InformationsTable rows={rows} data={report} className="text-base" />;
};

export { FragmentationObjectDetailsTable };
