'use server';

import { redirect } from 'next/navigation';

import type { TypeContactAnalystIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function postMessagesContactAnalyst(payload: TypeContactAnalystIn, callback: string) {
  await Api.postMessagesContactAnalyst(payload);

  redirect(`/contact-analyst/send?callback=${callback}`);
};
