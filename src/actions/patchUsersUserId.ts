'use server';

import { revalidateTag } from 'next/cache';

import type { TypeUserUpdate } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function patchUsersUserId(userId: string, payload: TypeUserUpdate) {
  await Api.patchUsersUserId(userId, payload);
  revalidateTag(REVALIDATION_TAGS.GET_USERS);
};
