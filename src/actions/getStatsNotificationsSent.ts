'use server';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type NotificationsSentStatsType = {
  date: string | null | undefined;
  totalCount: number;
  smsCount: number | string;
  emailCount: number | string;
};

export async function getStatsNotificationsSent(query?: TypeGetStatsNotificationsSentParams): Promise<NotificationsSentStatsType[]> {
  const { data } = await Api.getStatsNotificationsSent(query);

  const groupedData = data.reduce((acc, item) => {
    const { type, count, day, month } = item;

    const key = day || month as string;

    if (!acc[key]) {
      acc[key] = { date: day || month, totalCount: 0, smsCount: 0, emailCount: 0 };
    }

    if (type === 'Total') {
      acc[key].totalCount = count;
    } else if (type === 'SMS') {
      acc[key].smsCount = count;
    } else if (type === 'EMAIL') {
      acc[key].emailCount = count;
    }

    return acc;
  }, {} as { [key: string]: any });

  return Object.values(groupedData);
};
