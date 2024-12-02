'use server';

import { redirect } from 'next/navigation';

import { env } from '../../src/libs/Env';

type PostFeedbackPayloadType = {
  satisfaction: string;
  details: string;
};

export async function postFeedback(data: PostFeedbackPayloadType) {
  const formData = new FormData();

  formData.append('Satisfaction', data.satisfaction);
  formData.append('Details', data.details);

  await fetch(env.FEEDBACK_URL, {
    method: 'POST',
    body: formData,
  });

  redirect(`/feedback/success`);
};
