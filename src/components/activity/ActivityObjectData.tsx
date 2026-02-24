import dayjs from 'dayjs';
import { getTranslations } from 'next-intl/server';

import Api from '@/libs/Api';
import { FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { AdditionalInformationsTable } from '../satellite/tables/AdditionalInformationsTable';
import { BaseInformationsTable } from '../satellite/tables/BaseInformationsTable';
import { LicenseInformationsTable } from '../satellite/tables/LicenseInformationsTable';
import { OrbitalInformationsTable } from '../satellite/tables/OrbitalInformationsTable';

type ActivityObjectDataProps = {
  noradId: string;
};

const ActivityObjectData = async ({ noradId }: ActivityObjectDataProps) => {
  const t = await getTranslations('Activity.Object_data');

  try {
    const { data } = await Api.getSatellitesNoradId(noradId);

    return (
      <div data-pdf={t('title')}>
        <div className="govuk-body mt-2">
          {t('content')}
        </div>
        <BaseInformationsTable object={data} headerCellWidth="sm" showLink />
        <LicenseInformationsTable object={data} headerCellWidth="sm" />
        <OrbitalInformationsTable object={data} headerCellWidth="sm" />
        <h3 className="govuk-heading-s govuk-!-margin-top-6 ">
          {t('additional_object_summary.title')}
        </h3>
        {t.rich('additional_object_summary.content', { updateTime: dayjs(data.esa_update_time).format(FORMAT_DATE_TIME) }) }
        <AdditionalInformationsTable object={data} headerCellWidth="sm" />
      </div>
    );
  } catch {
    return (
      <div data-pdf={t('title')}>
        <div className="govuk-body mt-2">
          {t('content')}
        </div>
      </div>
    );
  }
};

export { ActivityObjectData };
