'use server';

import { revalidateTag } from 'next/cache';

import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function postBannersSchedules(formData: TypeBannerScheduleIn) {
  const { data } = await Api.postBannersSchedules(formData);

  revalidateTag(REVALIDATION_TAGS.GET_BANNERS);

  return data;
};
