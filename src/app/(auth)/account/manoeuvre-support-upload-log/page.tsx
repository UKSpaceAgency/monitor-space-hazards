import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeGetManoeuvrePlotsParams, TypeManoeuvrePlotMetadataSortBy } from '@/__generated__/data-contracts';
import { getManoeuvrePlots } from '@/actions/getManoeuvrePlots';
import { getUsersMe } from '@/actions/getUsersMe';
import { ManoeuvreDataTable } from '@/components/account/manoeuvre-support-upload-log/ManoeuvreDataTable';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';
import { isAgencyApprover } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'Manoeuvre support uploads',
};

export default async function ManoeuvreSupportUploadLog(props: {
  searchParams?: Promise<{
    sort_by?: TypeManoeuvrePlotMetadataSortBy;
  }>;
}) {
  const t = await getTranslations('Manoeuvre_support_upload_log');

  const user = await getUsersMe();

  if (!isAgencyApprover(user.role)) {
    notFound();
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.sort_by || 'created_at';

  const params: TypeGetManoeuvrePlotsParams = {
    limit: 50,
    sort_by: query,
  };

  const data = await getManoeuvrePlots(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <Suspense key={query} fallback={<Spinner />}>
        <ManoeuvreDataTable data={data} params={params} />
      </Suspense>
      <div className="mt-2">
        <Details summary={t('help.title')}>
          <p>{t('help.description1')}</p>
          <p>{t('help.description2')}</p>
        </Details>
      </div>
    </div>
  );
}
