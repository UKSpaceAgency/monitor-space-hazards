import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import type { TypeAnalysesSortBy, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { getAnalyses } from '@/actions/getAnalyses';
import { AnalysisDataTable } from '@/components/account/analysis-upload-log/AnalysisDataTable';
import Details from '@/ui/details/details';
import Spinner from '@/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'UKSA analysis uploads',
};

export default async function AnalysisUploadLog(props: {
  searchParams?: Promise<{
    sort_by?: TypeAnalysesSortBy;
  }>;
}) {
  const t = await getTranslations('AnalysisUploadLog');

  const searchParams = await props.searchParams;
  const query = searchParams?.sort_by || 'created_at';

  const params: TypeGetAnalysesParams = {
    sort_by: query,
    limit: 50,
  };

  const data = await getAnalyses(params);

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <p className="govuk-body">{t('description')}</p>
      <Suspense key={query} fallback={<Spinner />}>
        <AnalysisDataTable data={data} params={params} />
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
