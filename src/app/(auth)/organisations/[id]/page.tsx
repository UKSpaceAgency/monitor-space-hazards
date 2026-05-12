import { getOrganisation } from '@/actions/getOrganisation';
import { ContentNavigation } from '@/components/ContentNavigation';
import { OperatorSummary } from '@/components/organisations/OperatorSummary';
import { OrganisationAccordion } from '@/components/organisations/OrganisationAccordion';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;
  const organisation = await getOrganisation(id);
  return {
    title: organisation.name,
  };
}

export default async function OrganisationPage({
  params,
}: PageProps) {
  const { id } = await params;
  const organisation = await getOrganisation(id);

  return (
    <div>
      <h1 className="govuk-heading-xl">
        {organisation.name}
      </h1>
      <div className="grid md:grid-cols-4 gap-7">
        <ContentNavigation />
        <article className="md:col-span-3">
          <OperatorSummary organisation={organisation} />
          <OrganisationAccordion organisation={organisation} />
        </article>
      </div>
    </div>
  );
}
