import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { TypeAnalysesSortBy, TypeGetAnalysesParams } from '@/__generated__/data-contracts';
import { getAnalyses } from '@/actions/getAnalyses';
import { getUsersMe } from '@/actions/getUsersMe';
import { AnalysisDataTable } from '@/components/account/analysis-upload-log/AnalysisDataTable';
import Details from '@/ui/details/details';
import { isAnalysist } from '@/utils/Roles';

export const metadata: Metadata = {
  title: 'UKSA analysis uploads',
};

export default async function AnalysisUploadLog(props: {
  searchParams?: Promise<{
    sort_by?: TypeAnalysesSortBy;
  }>;
}) {
  const t = await getTranslations('Analysis_upload_log');

  const user = await getUsersMe();

  if (!isAnalysist(user.role)) {
    notFound();
  }

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
      <AnalysisDataTable data={data} params={params} />
      <div className="mt-2">
        <Details summary={t.rich('help.title')}>
          {t.rich('help.description1')}
          {t.rich('help.description2')}
        </Details>
      </div>
    </div>
  );
}
