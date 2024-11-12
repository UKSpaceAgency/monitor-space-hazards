'use server';

import Api from '@/libs/Api';

export async function getUsersByOrganisation(organisationId: string) {
  const { data } = await Api.getUsers();
  return data.filter(user => user.organizationId === organisationId);
};
