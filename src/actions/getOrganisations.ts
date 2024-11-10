'use server';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getOrganizations() {
  const { data } = await Api.getOrganizations({
    next: { tags: [REVALIDATION_TAGS.GET_ORGANISATIONS] },
  });

  return data;
};
