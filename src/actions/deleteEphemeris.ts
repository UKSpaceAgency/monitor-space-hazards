'use server';

import { revalidateTag } from 'next/cache';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function deleteEphemeris(ephemerisId: string) {
  const { data } = await Api.deleteEphemerisEphemerisId(ephemerisId);
  revalidateTag(REVALIDATION_TAGS.GET_EPHEMERISES);
  return data;
};
