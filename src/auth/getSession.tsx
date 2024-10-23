'use server';

import { auth } from '.';

export async function getSession() {
  const session = await auth();
  return session;
}
