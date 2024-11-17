import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { AdditionalInformationsTable } from './tables/AdditionalInformationsTable';

type SatelliteAdditionalInformationProps = {
  object: TypeSatelliteOut | TypeSatelliteOut[];
};

const SatelliteAdditionalInformations = ({ object }: SatelliteAdditionalInformationProps) => {
  const t = useTranslations('SatellitePage.AdditionalInformations');

  const updateTime = dayjs(Array.isArray(object) ? object[0]?.esaUpdateTime : object.esaUpdateTime).format(FORMAT_DATE_TIME);

  return (
    <div className="mb-12">
      <h3 className="govuk-heading-s">{t('title')}</h3>
      {t.rich('content', {
        updateTime,
      })}
      <AdditionalInformationsTable object={object} />
    </div>
  );
};

export { SatelliteAdditionalInformations };
