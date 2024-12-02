'use server';

import { redirect } from 'next/navigation';

import { env } from '../../src/libs/Env';

type PostFeedbackPayloadType = {
  satisfaction: string;
  details: string;
};

type FeedbackErrorType = {
  href: '#details' | '#satisfaction';
  errorMessage: string;
};

export async function postFeedback(_prevState: any, formData: FormData) {
  const data: PostFeedbackPayloadType = {
    satisfaction: formData.get('satisfaction') as string,
    details: formData.get('details') as string,
  };

  const errors: FeedbackErrorType[] = [];

  if (!data.satisfaction) {
    errors.push({
      errorMessage: 'You must select one option',
      href: '#satisfaction',
    });
  }

  if (!data.details) {
    errors.push({
      errorMessage: 'Field is required',
      href: '#details',
    });
  }

  if (data.details?.length > 2000) {
    errors.push({
      errorMessage: 'Your text must be 2000 characters or fewer.',
      href: '#details',
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }

  await fetch(env.FEEDBACK_URL, {
    method: 'POST',
    body: formData,
  });

  redirect(`/feedback/success`);
};
