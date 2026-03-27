import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeEphemerisSortBy, TypeGetEphemerisParams } from '@/__generated__/data-contracts';
import { getEphemerises } from '@/actions/getEphemerises';
import { getSession } from '@/actions/getSession';
import { EphemerisDataTable } from '@/components/account/ephemeris-upload-log/EphemerisDataTable';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';
import { isAnalysist } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'UKSA ephemeris uploads',
};

export default async function EphemerisUploadLog(props: {
  searchParams?: Promise<{
    sort_by?: TypeEphemerisSortBy;
  }>;
}) {
  const session = await getSession();
  const t = await getTranslations('Ephemeris_upload_log');

  if (!isAnalysist(session?.user.role)) {
    notFound();
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.sort_by || 'updated_at';

  const params: TypeGetEphemerisParams = {
    sort_by: query,
    limit: 50,
  };

  const data = await getEphemerises(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <Suspense key={query} fallback={<Spinner />}>
        <EphemerisDataTable data={data} params={params} />
      </Suspense>
      <div className="mt-2">
        <Details summary={t.rich('help.title')}>
          {t.rich('help.description1')}
          {t.rich('help.description2')}
        </Details>
      </div>
    </div>
  );
}
