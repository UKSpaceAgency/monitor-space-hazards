import { render } from '@react-email/render';
import * as Sentry from '@sentry/nextjs';

import ReEntryClosedownEmail from '@/emails/re-entry-closedown';

export async function POST(
  request: Request,
) {
  try {
    const { event, report } = await request.json();

    if (!event || !report) {
      return Response.json({ error: 'Invalid request' }, { status: 400, statusText: 'Invalid request' });
    }

    Sentry.captureMessage(JSON.stringify({ event, report }));

    const html = await render(<ReEntryClosedownEmail event={event} report={report} withPlaceholders />);

    return Response.json({
      html,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500, statusText: 'Internal server error' });
  }
}
