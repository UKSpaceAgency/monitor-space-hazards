'use server';

import { revalidateTag } from 'next/cache';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function deleteUser(userId: string) {
  const { data } = await Api.deleteUsersUserId(userId);
  revalidateTag(REVALIDATION_TAGS.GET_USERS);
  return data;
};
