import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { AdditionalInformationsTable } from '../satellite/tables/AdditionalInformationsTable';
import { BaseInformationsTable } from '../satellite/tables/BaseInformationsTable';
import { LicenseInformationsTable } from '../satellite/tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from '../satellite/tables/OrbitalInformationsTable';

type ConjunctionObjectDataProps = {
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
};

const ConjunctionObjectData = async ({ primaryObject, secondaryObject }: ConjunctionObjectDataProps) => {
  const t = await getTranslations('Conjunction.Object_data');

  const dataArray = [primaryObject, secondaryObject || {} as TypeSatelliteOut];

  return (
    <div data-pdf={t('title')}>
      <div className="govuk-body mt-2">
        {t('space_track')}
      </div>
      <BaseInformationsTable object={dataArray} headerCellWidth="sm" showLink />
      <LicenseInformationsTable object={dataArray} headerCellWidth="sm" />
      <OrbitalInformationsTable object={dataArray} headerCellWidth="sm" />
      <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
        {t('additional_object_summary.title')}
      </h3>
      {t.rich('additional_object_summary.content', { updateTime: dayjs(primaryObject.esaUpdateTime).format(FORMAT_DATE_TIME) }) }
      <AdditionalInformationsTable object={dataArray} headerCellWidth="sm" />
    </div>
  );
};

export { ConjunctionObjectData };
