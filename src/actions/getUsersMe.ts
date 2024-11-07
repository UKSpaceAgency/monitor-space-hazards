'use server';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getUsersMe() {
  const { data } = await Api.getUsersMe({
    next: { tags: [REVALIDATION_TAGS.GET_USERS_ME] },
  });

  return data;
};
