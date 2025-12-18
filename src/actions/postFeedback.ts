'use server';

import type { TypeFeedbackIn } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function postFeedback(data: TypeFeedbackIn) {
  await Api.postMessagesFeedback(data);

  return data;
}
