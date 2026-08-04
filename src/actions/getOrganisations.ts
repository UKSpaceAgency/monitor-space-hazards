'use server';

import type { TypeGetOrganizationsParams, TypeOrganizationOut } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getOrganisations(params: TypeGetOrganizationsParams): Promise<TypeOrganizationOut[]> {
  const { data } = await Api.getOrganizations(params);

  return data ?? [];
}
