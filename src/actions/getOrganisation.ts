import { notFound } from 'next/navigation';

import type { TypeOrganizationOut } from '@/__generated__/data-contracts';

import { getOrganisations } from './getOrganisations';

export async function getOrganisation(id: string): Promise<TypeOrganizationOut> {
  const organisations = await getOrganisations({});
  const organisation = organisations.find(org => org.id === id);
  if (!organisation) {
    notFound();
  }
  return organisation;
}
