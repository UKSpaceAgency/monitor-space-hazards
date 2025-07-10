import { render } from '@react-email/render';

import ConjunctionNotificationNewAndUpdatedEmail from '@/emails/conjunction-notification-new-and-updated';

export async function POST(
  request: Request,
) {
  try {
    const { newConjunctions, updatedConjunctions } = await request.json();

    if (!newConjunctions || !updatedConjunctions) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<ConjunctionNotificationNewAndUpdatedEmail newConjunctions={newConjunctions} updatedConjunctions={updatedConjunctions} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
