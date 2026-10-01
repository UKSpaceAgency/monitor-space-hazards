'use server';

import Api from '@/libs/Api';

export async function getReentryReportDownload(reportId: string) {
  try {
    const { data } = await Api.getReentryEventReportsReentryEventReportIdDownload(reportId);
    return data;
  } catch {
    return null;
  }
};
