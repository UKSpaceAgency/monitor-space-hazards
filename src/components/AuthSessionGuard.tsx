'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

/** Signs the user out when the access-token refresh fails (session timed out). */
export const AuthSessionGuard = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      void signOut({ redirectTo: '/api/auth/logout' });
    }
  }, [session?.error]);

  return null;
};
