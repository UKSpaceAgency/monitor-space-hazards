'use server';

import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getCdmsLatest(params: RequestParams = {}) {
  try {
    const { data } = await Api.getCdmsLatest(params);
    if (!data) {
      throw new Error('No report data returned');
    }
    return { data };
  } catch {
    return null;
  }
};
