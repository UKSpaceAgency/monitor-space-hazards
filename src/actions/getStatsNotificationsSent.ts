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

  return data.map((item) => {
    const { count, day, month, type } = item;

    return {
      date: day || month,
      totalCount: type === 'Total' ? count : 0,
      smsCount: type === 'SMS' ? count : 0,
      emailCount: type === 'EMAIL' ? count : 0,
    };
  });
};
