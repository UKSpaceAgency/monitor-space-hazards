'use server';

import type { TypeUserUpdate } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function patchUsersMe(params: TypeUserUpdate) {
  const { data } = await Api.patchUsersMe(params);
  return { data };
};
