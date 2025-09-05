'use server';

import type { TypeGetReentryEventReportsReentryEventShortIdParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getReentryReports(params: TypeGetReentryEventReportsReentryEventShortIdParams) {
  try {
    const { data } = await Api.getReentryEventReportsReentryEventShortId(params);
    return data;
  } catch {
    return [];
  }
};
