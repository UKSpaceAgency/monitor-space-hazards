import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Monitor UK satellite activity',
};

type PageProps = {
  searchParams?: Promise<{
    search_like?: string;
  }>;
};

export default async function ActivitiesPage(_props: PageProps) {
  notFound();
  // const t = await getTranslations('Activities');
  // const session = await getSession();

  // const searchParams = await props.searchParams;

  // const params: TypeGetActivityEventsParams = {
  //   search_like: searchParams?.search_like,
  //   limit: 50,
  // };

  // if (!isAgencyUser(session?.user.role) && !isRegulatorUser(session?.user.role)) {
  //   notFound();
  // }

  // return (
  //   <div>
  //     <h1 className="govuk-heading-xl">{t('title')}</h1>
  //     {t.rich('description')}
  //     <SearchBar label={t('search_bar.label')} id="satellites_search_bar" placeholder={t('search_bar.placeholder')} ariaLabel="Satellite Search Bar" />
  //     <Suspense fallback={<Spinner />}>
  //       <ActivitiesEventsTable params={params} />
  //     </Suspense>
  //     <Details summary={t.rich('help.title')}>
  //       {t.rich('help.content')}
  //     </Details>
  //   </div>
  // );
}
