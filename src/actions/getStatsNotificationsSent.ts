'use server';

import type { TypeGetStatsNotificationsSentParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type NotificationsSentStatsType = {
  date: string;
  totalCount: number;
  smsCount: number;
  emailCount: number;
};

export async function getStatsNotificationsSent(query?: TypeGetStatsNotificationsSentParams): Promise<NotificationsSentStatsType[]> {
  const { data } = await Api.getStatsNotificationsSent(query);

  const groupedData = data.reduce((acc, item) => {
    const { type, count, day, month } = item;

    const key = day || month as string;

    if (!acc[key]) {
      acc[key] = { date: day || month || '', totalCount: 0, smsCount: 0, emailCount: 0 };
    }

    switch (type) {
      case 'Total':
        acc[key].totalCount = count;
        break;
      case 'SMS':
        acc[key].smsCount = count;
        break;
      case 'EMAIL':
        acc[key].emailCount = count;
        break;
    }

    return acc;
  }, {} as { [key: string]: NotificationsSentStatsType });

  return Object.values(groupedData);
};
