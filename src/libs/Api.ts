import { MshService } from '@/__generated__/V1';
import { getSession } from '@/auth/getSession';

export const initialiseApi = (token?: string) => {
  return new MshService({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    securityWorker: async () => {
      let accessToken;
      if (token) {
        accessToken = token;
      } else {
        const session = await getSession();
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
