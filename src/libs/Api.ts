import { MshService } from '@/__generated__/V1';
import { auth } from '@/auth';

import { env } from './Env';

export const initialiseApi = (token?: string) => {
  return new MshService({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    securityWorker: async () => {
      let accessToken;
      if (token) {
        accessToken = token;
      } else {
        const session = await auth();
        if (session?.access_token) {
          accessToken = session.access_token;
        }
      }
      if (accessToken) {
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
    },
  });
};

export default initialiseApi();
