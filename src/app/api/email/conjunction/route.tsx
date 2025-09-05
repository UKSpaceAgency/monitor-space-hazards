import { render } from '@react-email/render';

import ConjunctionEmail from '@/emails/conjunction';

export async function POST(
  request: Request,
) {
  try {
    const { report, event } = await request.json();

    if (!report || !event) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<ConjunctionEmail report={report} event={event} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
