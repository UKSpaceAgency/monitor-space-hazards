'use server';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getUsersByOrganisation(organisationId: string) {
  const { data } = await Api.getUsers({
    next: { tags: [REVALIDATION_TAGS.GET_USERS] },
  });
  return data.filter(user => user.organizationId === organisationId);
};
