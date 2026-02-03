import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';

import { BaseInformationsTable } from './tables/BaseInformationsTable';
import { LicenseInformationsTable } from './tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from './tables/OrbitalInformationsTable';

type SatelliteInformationProps = {
  object: TypeSatelliteOut | TypeSatelliteOut[] | null;
  dataPdf?: string;
  haveAnchor?: boolean;
};

const SatelliteInformation = ({ object, dataPdf, haveAnchor = true }: SatelliteInformationProps) => {
  const t = useTranslations('Tables.Satellite_informations.Informations');
  return (
    <div className="mb-12" data-pdf={dataPdf}>
      <h2 data-anchor={haveAnchor ? 'information' : undefined} className="govuk-heading-l">{t('title')}</h2>
      <p className="govuk-body">{t('content')}</p>
      {object
        ? (
            <>
              <BaseInformationsTable object={object} />
              <LicenseInformationsTable object={object} />
              <OrbitalInformationsTable object={object} />
            </>
          )
        : (
            <p className="govuk-body">No satellite information available</p>
          )}
    </div>
  );
};

export { SatelliteInformation };
