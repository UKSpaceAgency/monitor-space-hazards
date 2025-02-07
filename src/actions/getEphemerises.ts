'use server';

import type { TypeGetEphemerisParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getEphemerises(params: TypeGetEphemerisParams) {
  const { data } = await Api.getEphemeris(params, {
    next: { tags: [REVALIDATION_TAGS.GET_EPHEMERISES] },
  });

  return data;
};
