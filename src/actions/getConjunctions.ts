'use server';

import type { TypeGetConjunctionEventsListParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getConjunctions(params: TypeGetConjunctionEventsListParams) {
  const { data } = await Api.getConjunctionEventsList(params);
  return data;
};
