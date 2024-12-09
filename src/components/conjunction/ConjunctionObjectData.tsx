import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';

import RichText from '../RichText';
import { AdditionalInformationsTable } from '../satellite/tables/AdditionalInformationsTable';
import { BaseInformationsTable } from '../satellite/tables/BaseInformationsTable';
import { LicenseInformationsTable } from '../satellite/tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from '../satellite/tables/OrbitalInformationsTable';

type ConjunctionObjectDataProps = {
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
};

const ConjunctionObjectData = ({ primaryObject, secondaryObject }: ConjunctionObjectDataProps) => {
  const t = useTranslations('Accordions.Conjunction.object_data');

  const dataArray = [primaryObject, secondaryObject || {} as TypeSatelliteOut];

  return (
    <div data-pdf={t('title')}>
      <div className="govuk-body mt-2">
        {t('space_track')}
      </div>
      <div className="overflow-auto">
        <BaseInformationsTable object={dataArray} headerCellWidth="xs" showLink />
      </div>
      <div className="overflow-auto">
        <LicenseInformationsTable object={dataArray} headerCellWidth="xs" />
      </div>
      <div className="overflow-auto">
        <OrbitalInformationsTable object={dataArray} headerCellWidth="xs" />
      </div>
      <h3 className="govuk-heading-s govuk-!-margin-top-6 govuk-!-margin-bottom-0">
        {t('additional_object_summary.title')}
      </h3>
      <RichText>
        {tags => t.rich('additional_object_summary.content', { ...tags, updateTime: dayjs(primaryObject.esaUpdateTime).format(FORMAT_DATE_TIME) }) }
      </RichText>
      <div className="overflow-auto">
        <AdditionalInformationsTable object={dataArray} headerCellWidth="xs" />
      </div>
    </div>
  );
};

export { ConjunctionObjectData };
