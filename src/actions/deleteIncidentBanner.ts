'use server';

import { revalidateTag } from 'next/cache';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function deleteIncidentBanner(bannerId: string) {
  const { data } = await Api.deleteBannersSchedulesScheduleId(bannerId);
  revalidateTag(REVALIDATION_TAGS.GET_BANNERS);
  return data;
};
