'use server';

import { revalidateTag } from 'next/cache';

import type { TypeUserUpdate } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchUsersMe(params: TypeUserUpdate) {
  const data = await Api.patchUsersMe(params);
  revalidateTag(REVALIDATION_TAGS.GET_USERS_ME);
  return data;
};
