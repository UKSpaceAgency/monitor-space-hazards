'use server';

import type { TypeActivityReportOut } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getActivityEventLatestReport(shortId: string): Promise<TypeActivityReportOut | null> {
  try {
    const { data } = await Api.getActivityReportsActivityEventShortIdLatest(shortId);
    return data;
  } catch {
    return null;
  }
}
