'use server';

import type { TypeContactAnalystIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function postMessagesContactAnalyst(payload: TypeContactAnalystIn) {
  await Api.postMessagesContactAnalyst(payload);
};
