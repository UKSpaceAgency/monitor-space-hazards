'use server';

import { notFound } from 'next/navigation';

import type { TypeGetConjunctionReportsConjunctionEventShortIdParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getConjunctionReports(params: TypeGetConjunctionReportsConjunctionEventShortIdParams) {
  try {
    const { data } = await Api.getConjunctionReportsConjunctionEventShortId(params);
    return data;
  } catch {
    notFound();
  }
};
