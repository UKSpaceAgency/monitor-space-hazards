'use client';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { InformationsTableRow } from '@/components/InformationsTable';
import { InformationsTable } from '@/components/InformationsTable';

type ConjunctionObjectDataLicenseInformations = Pick<
  TypeSatelliteOut,
'licenseCountry' | 'launchSite' | 'launchDate'
>;

type ConjunctionObjectDataLicenseTableProps = {
  data: ConjunctionObjectDataLicenseInformations | ConjunctionObjectDataLicenseInformations[];
};

const ConjunctionObjectDataLicenseTable = ({ data }: ConjunctionObjectDataLicenseTableProps) => {
  const t = useTranslations('Tables.Conjunction');

  const rows: InformationsTableRow<ConjunctionObjectDataLicenseInformations>[] = [{
    header: t('object_data.license_summary.country'),
    accessorKey: 'licenseCountry',
  }, {
    header: t('object_data.license_summary.launching_site'),
    accessorKey: 'launchSite',
  }, {
    header: t('object_data.license_summary.launch_date'),
    accessorKey: 'launchDate',
  }];

  return <InformationsTable rows={rows} data={data} headerCellWidth="xs" />;
};

export { ConjunctionObjectDataLicenseTable };
