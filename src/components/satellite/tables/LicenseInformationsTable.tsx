import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs } from '@/libs/Dayjs';
import { getFullCountry } from '@/utils/Regions';

type LicenseSatelliteInformations = Pick<TypeSatelliteOut, 'licenseCountry' | 'launchSite' | 'launchDate' >;

type LicenseInformationsTableProps = {
  object: LicenseSatelliteInformations | LicenseSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
};

const LicenseInformationsTable = async ({ object, headerCellWidth }: LicenseInformationsTableProps) => {
  const t = await getTranslations('Tables.Satellite_informations');

  const headers = Array.isArray(object)
    ? [{
        className: 'w-1/3',
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
    accessorKey: 'licenseCountry',
    renderCell: row => getFullCountry(row.licenseCountry),
  }, {
    header: t('License.launching_site'),
    accessorKey: 'launchSite',
  }, {
    header: t('License.launch_date'),
    accessorKey: 'launchDate',
    renderCell: row => row.launchDate ? dayjs(row.launchDate).format('YYYY') : '',
  }];

  return <InformationsTable caption={t('License.caption')} headers={headers} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { LicenseInformationsTable };
