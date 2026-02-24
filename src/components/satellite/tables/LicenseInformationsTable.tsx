import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

export type LicenseSatelliteInformations = Pick<TypeSatelliteOut, 'license_country' | 'launch_site' | 'launch_date' >;

type LicenseInformationsTableProps = {
  object: LicenseSatelliteInformations | LicenseSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
};

const LicenseInformationsTable = async ({ object, headerCellWidth }: LicenseInformationsTableProps) => {
  const t = await getTranslations('Tables.Satellite_informations');

  const headers = Array.isArray(object)
    ? [{
        className: 'w-1/3',
        children: <div className="hidden">{t('Objects.description')}</div>,
      }, {
        className: 'w-1/3',
        children: t('Objects.primary'),
      }, {
        className: 'w-1/3',
        children: t('Objects.secondary'),
      }]
    : undefined;

  const baseInformations: InformationsTableRow<LicenseSatelliteInformations>[] = [{
    header: t('License.country'),
    accessorKey: 'license_country',
    renderCell: row => getFullCountry(row.license_country) ?? '-',
  }, {
    header: t('License.launching_site'),
    accessorKey: 'launch_site',
  }, {
    header: t('License.launch_date'),
    accessorKey: 'launch_date',
    renderCell: row => row.launch_date ? dayjs(row.launch_date).format('YYYY') : '-',
  }];

  return <InformationsTable caption={t('License.caption')} headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { LicenseInformationsTable };
