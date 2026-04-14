import { getOrganisation } from '@/actions/getOrganisation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const organisations = await getOrganisation(id);
  return {
    title: organisations.name,
  };
}

export default async function OrganisationPage({
  params,
}: PageProps) {
  const { id } = await params;
  const organisations = await getOrganisation(id);

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {organisations.name}
      </h1>
      {/* <ContentNavigation className="mb-8" /> */}
    </div>
  );
}
