import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableHeaderWidth, InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';
import { dayjs } from '@/libs/Dayjs';

type LicenseSatelliteInformations = Pick<TypeSatelliteOut, 'licenseCountry' | 'launchSite' | 'launchDate' >;

type LicenseInformationsTableProps = {
  object: LicenseSatelliteInformations | LicenseSatelliteInformations[];
  headerCellWidth?: InformationsTableHeaderWidth;
};

const LicenseInformationsTable = ({ object, headerCellWidth }: LicenseInformationsTableProps) => {
  const t = useTranslations('Tables.SatelliteInformations');

  const baseInformations: InformationsTableRow<LicenseSatelliteInformations>[] = [{
    header: t('License.country'),
    accessorKey: 'licenseCountry',
  }, {
    header: t('License.launching_site'),
    accessorKey: 'launchSite',
  }, {
    header: t('License.launch_date'),
    accessorKey: 'launchDate',
    renderCell: row => dayjs(row.launchDate).format('YYYY'),
  }];

  return <InformationsTable caption={t('License.caption')} rows={baseInformations} data={object} headerCellWidth={headerCellWidth} />;
};

export { LicenseInformationsTable };
