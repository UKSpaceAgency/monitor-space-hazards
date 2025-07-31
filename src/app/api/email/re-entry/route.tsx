import { render } from '@react-email/render';

import ReEntryEmail from '@/emails/re-entry';

export async function POST(
  request: Request,
) {
  try {
    const { event, report } = await request.json();

    if (!event || !report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    const html = await render(<ReEntryEmail event={event} report={report} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
