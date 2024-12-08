'use server';

import Api from '@/libs/Api';

export async function getReentryReports(shortId: string) {
  const { data } = await Api.getReentryEventReportsReentryEventShortId({ shortId });
  return data;
};
