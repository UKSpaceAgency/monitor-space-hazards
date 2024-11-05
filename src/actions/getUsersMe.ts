'use server';

import Api from '@/libs/Api';

export async function getUsersMe() {
  const { data } = await Api.getUsersMe();
  return data;
};
