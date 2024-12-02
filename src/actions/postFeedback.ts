'use server';

import { redirect } from 'next/navigation';

type PostFeedbackPayloadType = {
  satisfaction: string;
  details: string;
};

export async function postFeedback(data: PostFeedbackPayloadType) {
  const formData = new FormData();

  formData.append('Satisfaction', data.satisfaction);
  formData.append('Details', data.details);

  await fetch('https://getform.io/f/8eabf249-d63d1-a035-e1ba5d637cb3', {
    method: 'POST',
    body: formData,
  });

  redirect(`/feedback/success`);
};
