'use server';

import type { TypeGetFragmentationReportsFragmentationEventShortIdParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getFragmentationReports(params: TypeGetFragmentationReportsFragmentationEventShortIdParams) {
  const { data } = await Api.getFragmentationReportsFragmentationEventShortId(params);
  return data;
}
