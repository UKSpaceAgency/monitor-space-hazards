import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { AdditionalInformationsTable } from './tables/AdditionalInformationsTable';

type SatelliteAdditionalInformationProps = {
  object: TypeSatelliteOut | TypeSatelliteOut[];
};

const SatelliteAdditionalInformations = ({ object }: SatelliteAdditionalInformationProps) => {
  const t = useTranslations('Tables.Satellite_informations.Additional_informations');

  const updateTime = dayjs(Array.isArray(object) ? object[0]?.esa_update_time : object.esa_update_time).format(FORMAT_DATE_TIME);

  return (
    <div className="mb-12">
      <h3 className="govuk-heading-s">{t('title')}</h3>
      <Fragment key="content">
        {t.rich('content', {
          updateTime,
        })}
      </Fragment>
      <AdditionalInformationsTable object={object} />
      <Fragment key="footer">
        {t.rich('footer', {
          updateTime,
        })}
      </Fragment>
    </div>
  );
};

export { SatelliteAdditionalInformations };
