'use server';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';
import { dayjs } from '@/libs/Dayjs';

export type StatsMonthlyOrganizationsType = {
  month: Date;
  organisations: number;
  users: number;
};

export async function getStatsMonthlyOrganizations(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<StatsMonthlyOrganizationsType[]> {
  const { data: organisations } = await Api.getStatsMonthlyOrganizations(query);
  const { data: users } = await Api.getStatsMonthlyUsers(query);

  const data = organisations.map((org, index) => ({
    month: dayjs(org.month).toDate(),
    organisations: org.runningTotal,
    users: users?.[index]?.runningTotal ?? 0,
  }));

  return data;
}
