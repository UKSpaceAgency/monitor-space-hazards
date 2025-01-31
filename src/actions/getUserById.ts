'use server';

import Api from '@/libs/Api';

export async function getUsersById(id: string) {
  const { data } = await Api.getUsers();
  const user = data.find(user => user.id === id);

  if (!user) {
    throw new Error('Cannot find this user!');
  }

  return user;
};
