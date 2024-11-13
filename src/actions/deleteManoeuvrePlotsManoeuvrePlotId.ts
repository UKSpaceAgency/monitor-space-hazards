'use server';

import { revalidateTag } from 'next/cache';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

import { REVALIDATION_TAGS } from './tags';

export async function deleteManoeuvrePlotsManoeuvrePlotId(analysisId: string, params: RequestParams = {}) {
  const { data } = await Api.deleteManoeuvrePlotsManoeuvrePlotId(analysisId, params);

  revalidateTag(REVALIDATION_TAGS.GET_MANOEUVRE);
  return { data };
};
