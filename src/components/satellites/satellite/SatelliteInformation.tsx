import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { dayjs } from '@/libs/Dayjs';
import { Table, TableBody, TableCaption, TableCell, TableCellHeader, TableRow } from '@/ui/table/Table';
import { getFullCountry } from '@/utils/Regions';

type SatelliteInformationProps = {
  object: TypeSatelliteOut;
};

const SatelliteInformation = ({ object }: SatelliteInformationProps) => {
  const t = useTranslations('SatellitePage.Information');

  return (
    <div>
      <h2 data-anchor="information" className="hidden">{t('title')}</h2>
      <p className="govuk-body">{t('content')}</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('base.common_name')}</TableCellHeader>
            <TableCell>{object.commonName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('base.norad_id')}</TableCellHeader>
            <TableCell>{object.noradId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('base.international_designator')}</TableCellHeader>
            <TableCell>{object.internationalDesignator}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('base.object_type')}</TableCellHeader>
            <TableCell>{object.objectType}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>{t('license_information.caption')}</TableCaption>
        <TableBody>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('license_information.country')}</TableCellHeader>
            <TableCell>{getFullCountry(object.licenseCountry)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('license_information.launching_site')}</TableCellHeader>
            <TableCell>{object.launchSite}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('license_information.launch_date')}</TableCellHeader>
            <TableCell>{dayjs(object.launchDate).format('YYYY')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>{t('orbital_information.caption')}</TableCaption>
        <TableBody>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('orbital_information.apogee')}</TableCellHeader>
            <TableCell>{object.apogee || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('orbital_information.perigee')}</TableCellHeader>
            <TableCell>{object.perigee || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('orbital_information.inclination')}</TableCellHeader>
            <TableCell>{object.inclination || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCellHeader className="w-6/12">{t('orbital_information.period')}</TableCellHeader>
            <TableCell>{object.period || '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { SatelliteInformation };
