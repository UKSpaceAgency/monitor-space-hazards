'use server';

import { auth } from '../auth';

export async function getSession() {
  const session = await auth();
  if (session?.error === 'RefreshAccessTokenError') {
    return null;
  }
  return session;
}
