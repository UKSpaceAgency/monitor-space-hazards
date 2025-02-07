import { notFound } from 'next/navigation';

import { getOrganizations } from './getOrganisations';

export async function getOrganisation(id: string) {
  const organisations = await getOrganizations();
  const organisation = organisations.find(organisation => organisation.id === id);

  if (!organisation) {
    notFound();
  }
  return organisation;
}
