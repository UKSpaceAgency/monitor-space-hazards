'use server';

import type { TypeGetStatsMonthlyOrganizationsParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type OrganisationAndUsersStatsType = {
  month: string;
  organisations: number;
  users: number;
};

export async function getOrganisationsAndUsersStats(query?: TypeGetStatsMonthlyOrganizationsParams): Promise<OrganisationAndUsersStatsType[]> {
  const { data: organisations } = await Api.getStatsMonthlyOrganizations(query);
  const { data: users } = await Api.getStatsMonthlyUsers(query);

  const data = organisations.map((org, index) => ({
    month: org.month,
    organisations: org.runningTotal,
    users: users?.[index]?.runningTotal ?? 0,
  }));

  return data;
}
