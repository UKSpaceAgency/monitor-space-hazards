'use server';

import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function getIncidentBanners() {
  const { data } = await Api.getBannersMessagesCurrent(undefined, {
    next: { tags: [REVALIDATION_TAGS.GET_BANNERS] },
  });

  return data;
};
