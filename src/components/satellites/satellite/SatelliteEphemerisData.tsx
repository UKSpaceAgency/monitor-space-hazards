import { useTranslations } from 'next-intl';

import type { TypeEphemerisOut } from '@/__generated__/data-contracts';

import { EphemerisesTable } from './tables/EphemerisesTable';

type SatelliteEphemerisDataProps = {
  ephemerises: TypeEphemerisOut[];
};

const SatelliteEphemerisData = ({ ephemerises }: SatelliteEphemerisDataProps) => {
  const t = useTranslations('SatellitePage.EphemerisData');
  return (
    <div className="mb-12">
      <h2 className="govuk-heading-l" data-anchor="ephemeris">{t('title')}</h2>
      <p className="govuk-body">{t('content')}</p>
      <EphemerisesTable data={ephemerises} />
    </div>
  );
};

export { SatelliteEphemerisData };
