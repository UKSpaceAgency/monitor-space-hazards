import type { TypeUserRole } from '@/__generated__/data-contracts';
import { initialiseApi } from '@/libs/Api';

type UserData = {
  role: TypeUserRole | undefined;
  setup_completed: boolean;
};

export default async function getUser(accessToken: string): Promise<UserData> {
  const apiClient = initialiseApi(accessToken);
  const { data } = await apiClient.getMeV1UsersMeGet();

  return {
    role: data.role,
    setup_completed: !!(data.account_details_confirmed_at && data.toc_accepted_at),
  };
}
