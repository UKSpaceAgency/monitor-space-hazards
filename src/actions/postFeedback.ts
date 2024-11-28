'use server';

export async function postFeedback(formData: FormData) {
  await fetch('https://getform.io/f/8eabf249-d63d1-a035-e1ba5d637cb3', {
    method: 'POST',
    body: formData,
  });
};
