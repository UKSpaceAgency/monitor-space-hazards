import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getSatellites } from '@/actions/getSatellites';
import { dayjs } from '@/libs/Dayjs';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import { getFullCountry } from '@/utils/Regions';

type OrganisationTableProps = {
  organisationId: string;
};

const OrganisationTable = async ({ organisationId }: OrganisationTableProps) => {
  const t = await getTranslations('Organisation.satellites_table');

  const satellites = await getSatellites({ organization_id: organisationId });

  return (
    <div>
      <h2 className="govuk-heading-l">{t('registered_satellites')}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>{t('commonName')}</TableCellHeader>
            <TableCellHeader>{t('noradId')}</TableCellHeader>
            <TableCellHeader>{t('international_designator')}</TableCellHeader>
            <TableCellHeader>{t('country')}</TableCellHeader>
            <TableCellHeader>{t('launchSite')}</TableCellHeader>
            <TableCellHeader>{t('launchDate')}</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {satellites.map(({ id, noradId, commonName, internationalDesignator, licenseCountry, launchSite, launchDate }) => (
            <TableRow key={id}>
              <TableCell><Link className="govuk-link" href={`/satellites/${noradId}`}>{commonName}</Link></TableCell>
              <TableCell>{noradId}</TableCell>
              <TableCell>{internationalDesignator}</TableCell>
              <TableCell>{getFullCountry(licenseCountry)}</TableCell>
              <TableCell>{launchSite}</TableCell>
              <TableCell>{dayjs(launchDate).format('DD/MM/YY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
};

export { OrganisationTable };
