import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { TypeEphemerisOut } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';

import { EphemerisesTable } from './tables/EphemerisesTable';

type SatelliteEphemerisDataProps = {
  noradId: string;
  ephemerises: TypeEphemerisOut[];
};

const SatelliteEphemerisData = ({ noradId, ephemerises }: SatelliteEphemerisDataProps) => {
  const t = useTranslations('Satellite.Ephemeris_data');
  return (
    <div className="mb-12">
      <Link href={`/satellites/${noradId}/ephemeris-upload`}>
        <Button>{t('upload_button')}</Button>
      </Link>
      <h2 className="govuk-heading-l" data-anchor="ephemeris">{t('title')}</h2>
      <p className="govuk-body">{t('content')}</p>
      <EphemerisesTable data={ephemerises} />
    </div>
  );
};

export { SatelliteEphemerisData };
