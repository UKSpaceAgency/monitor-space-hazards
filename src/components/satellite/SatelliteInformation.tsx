import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';

import { BaseInformationsTable } from './tables/BaseInformationsTable';
import { LicenseInformationsTable } from './tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from './tables/OrbitalInformationsTable';

type SatelliteInformationProps = {
  object: TypeSatelliteOut | TypeSatelliteOut[];
  dataPdf?: string;
};

const SatelliteInformation = ({ object, dataPdf }: SatelliteInformationProps) => {
  const t = useTranslations('Tables.SatelliteInformations.Informations');
  return (
    <div className="mb-12" data-pdf={dataPdf}>
      <h2 data-anchor="information" className="hidden">{t('title')}</h2>
      <p className="govuk-body">{t('content')}</p>
      <BaseInformationsTable object={object} />
      <LicenseInformationsTable object={object} />
      <OrbitalInformationsTable object={object} />
    </div>
  );
};

export { SatelliteInformation };
