import { useTranslations } from 'next-intl';

import type { TypeEphemerisOut } from '@/__generated__/data-contracts';
import Button from '@/ui/button/button';

import { EphemerisesTable } from './tables/EphemerisesTable';

type SatelliteEphemerisDataProps = {
  noradId: string;
  ephemerises: TypeEphemerisOut[];
  showButtons: boolean;
};

const SatelliteEphemerisData = ({ noradId, ephemerises, showButtons }: SatelliteEphemerisDataProps) => {
  const t = useTranslations('Satellite.Ephemeris_data');
  return (
    <div className="mb-12">
      {showButtons && (
        <Button as="link" href={`/satellites/${noradId}/ephemeris-upload`} aria-label={t('upload_button')}>{t('upload_button')}</Button>
      )}
      {ephemerises.length
        ? (
            <>
              <h2 className="govuk-heading-l" data-anchor="ephemeris">{t('title')}</h2>
              <p className="govuk-body">{t('content')}</p>
              <EphemerisesTable data={ephemerises} showDeleteButton={showButtons} />
            </>
          )
        : null}
    </div>
  );
};

export { SatelliteEphemerisData };
