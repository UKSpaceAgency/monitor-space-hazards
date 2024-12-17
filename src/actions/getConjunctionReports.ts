'use server';

import type { TypeGetConjunctionReportsConjunctionEventShortIdParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getConjunctionReports(params: TypeGetConjunctionReportsConjunctionEventShortIdParams) {
  const { data } = await Api.getConjunctionReportsConjunctionEventShortId(params);
  return data;
};
